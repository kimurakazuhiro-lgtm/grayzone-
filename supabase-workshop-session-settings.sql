-- 研修回ごとに回答と結果を分ける設定です。SQL Editorで1回実行してください。
alter table public.workshop_settings
add column if not exists question_indexes integer[] not null default array[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

alter table public.workshop_settings add column if not exists session_name text not null default '未設定';
alter table public.workshop_settings add column if not exists service_question_indexes jsonb not null default '{}'::jsonb;

drop function if exists public.admin_workshop_settings();
create function public.admin_workshop_settings()
returns table(access_code text, is_results_published boolean, question_count integer, question_indexes integer[], session_name text, service_question_indexes jsonb)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_workshop_admin() then raise exception '管理者権限がありません。'; end if;
  return query
  select settings.access_code, settings.is_results_published, settings.question_count, settings.question_indexes, settings.session_name, settings.service_question_indexes
  from public.workshop_settings as settings
  where settings.id = true;
end; $$;

drop function if exists public.update_workshop_settings(text, boolean, integer, integer[]);
drop function if exists public.update_workshop_settings(text, boolean, integer, integer[], text);
drop function if exists public.update_workshop_settings(text, boolean, integer, integer[], text, jsonb);
create function public.update_workshop_settings(p_access_code text, p_is_results_published boolean, p_question_count integer, p_question_indexes integer[], p_session_name text, p_service_question_indexes jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_workshop_admin() then raise exception '管理者権限がありません。'; end if;
  if char_length(trim(p_access_code)) < 6 then raise exception '閲覧コードは6文字以上にしてください。'; end if;
  if char_length(trim(p_session_name)) < 1 then raise exception '今回の研修名を入力してください。'; end if;
  if coalesce(array_length(p_question_indexes, 1), 0) <> 10 then raise exception '質問は10問に設定してください。'; end if;
  if not (
    jsonb_typeof(p_service_question_indexes->'居宅') = 'array' and jsonb_array_length(p_service_question_indexes->'居宅') = 10 and
    jsonb_typeof(p_service_question_indexes->'入所') = 'array' and jsonb_array_length(p_service_question_indexes->'入所') = 10 and
    jsonb_typeof(p_service_question_indexes->'相談') = 'array' and jsonb_array_length(p_service_question_indexes->'相談') = 10 and
    jsonb_typeof(p_service_question_indexes->'就労') = 'array' and jsonb_array_length(p_service_question_indexes->'就労') = 10 and
    jsonb_typeof(p_service_question_indexes->'放デイ') = 'array' and jsonb_array_length(p_service_question_indexes->'放デイ') = 10 and
    jsonb_typeof(p_service_question_indexes->'児発') = 'array' and jsonb_array_length(p_service_question_indexes->'児発') = 10 and
    jsonb_typeof(p_service_question_indexes->'GH') = 'array' and jsonb_array_length(p_service_question_indexes->'GH') = 10
  ) then raise exception '各事業所で質問を10問選択してください。'; end if;
  update public.workshop_settings set access_code=trim(p_access_code), is_results_published=p_is_results_published, question_count=10, question_indexes=p_question_indexes, session_name=trim(p_session_name), service_question_indexes=p_service_question_indexes, updated_at=now() where id=true;
end; $$;

create or replace function public.public_workshop_session_name()
returns text language sql security definer set search_path = public as $$ select session_name from public.workshop_settings where id=true; $$;

create or replace function public.public_workshop_service_question_indexes()
returns jsonb language sql security definer set search_path = public as $$ select service_question_indexes from public.workshop_settings where id=true; $$;

-- 現在の研修名と一致する回答だけを集計します。
drop function if exists public.get_workshop_results(text);
create function public.get_workshop_results(p_access_code text)
returns table(question_number integer, category text, question_text text, entered_count bigint, not_entered_count bigint, response_count bigint, five_keys jsonb)
language plpgsql security definer set search_path=public as $$
declare current_session text;
begin
  select session_name into current_session from public.workshop_settings where id=true and is_results_published=true and access_code=trim(p_access_code);
  if current_session is null then raise exception '閲覧コードが違うか、結果はまだ公開されていません。'; end if;
  return query
  with items as (
    select (q.ordinality-1)::integer n, q.item->>'category' c, q.item->>'text' t,
      r.answers->'answers'->>(q.ordinality-1)::text a, r.answers->'responseKeys'->(q.ordinality-1)::text k
    from public.responses r cross join lateral jsonb_array_elements(r.answers->'questions') with ordinality q(item,ordinality)
    where r.answers->>'workshopSessionName'=current_session
  ), summary as (
    select min(n)::integer n,c,t,count(*) filter(where a='入る')::bigint e,count(*) filter(where a='入らない')::bigint ne,count(*)::bigint rc from items where a in ('入る','入らない') group by c,t
  ), keys as (
    select c,t,jsonb_object_agg(key_name,key_count) fk from (select c,t,key_name,count(*)::bigint key_count from items cross join lateral jsonb_array_elements_text(coalesce(k,'[]'::jsonb)) x(key_name) where a='入る' group by c,t,key_name) z group by c,t
  ) select s.n,s.c,s.t,s.e,s.ne,s.rc,coalesce(keys.fk,'{}'::jsonb) from summary s left join keys on keys.c=s.c and keys.t=s.t order by s.c,s.t;
end; $$;

revoke all on function public.admin_workshop_settings() from public;
revoke all on function public.update_workshop_settings(text, boolean, integer, integer[], text, jsonb) from public;
revoke all on function public.public_workshop_session_name() from public;
revoke all on function public.public_workshop_service_question_indexes() from public;
revoke all on function public.get_workshop_results(text) from public;
grant execute on function public.admin_workshop_settings() to authenticated;
grant execute on function public.update_workshop_settings(text, boolean, integer, integer[], text, jsonb) to authenticated;
grant execute on function public.public_workshop_session_name() to anon, authenticated;
grant execute on function public.public_workshop_service_question_indexes() to anon, authenticated;
grant execute on function public.get_workshop_results(text) to anon, authenticated;

drop function if exists public.get_workshop_optional_texts(text);
create function public.get_workshop_optional_texts(p_access_code text)
returns table(category text, question_text text, input_type text, content text)
language plpgsql security definer set search_path=public as $$
declare current_session text;
begin
  select session_name into current_session from public.workshop_settings where id=true and is_results_published=true and access_code=trim(p_access_code);
  if current_session is null then raise exception '閲覧コードが違うか、結果はまだ公開されていません。'; end if;
  return query
  select q.item->>'category',q.item->>'text','関連するエピソード（任意）'::text,e.value
  from public.responses r cross join lateral jsonb_each_text(coalesce(r.answers->'episodes','{}'::jsonb)) e(question_index,value)
  join lateral jsonb_array_elements(r.answers->'questions') with ordinality q(item,ordinality) on q.ordinality-1=e.question_index::integer
  where r.answers->>'workshopSessionName'=current_session and btrim(e.value)<>''
  union all
  select null::text,null::text,'最後に入力した気になった対応（任意）'::text,r.answers->>'fieldSuggestion'
  from public.responses r where r.answers->>'workshopSessionName'=current_session and btrim(coalesce(r.answers->>'fieldSuggestion',''))<>'';
end; $$;
revoke all on function public.get_workshop_optional_texts(text) from public;
grant execute on function public.get_workshop_optional_texts(text) to anon, authenticated;

-- 過去の研修名を選んで結果を表示するための追加設定です。
create or replace function public.get_workshop_result_sessions(p_access_code text)
returns table(session_name text)
language plpgsql security definer set search_path=public as $$
begin
  if not exists (
    select 1 from public.workshop_settings
    where id=true and is_results_published=true and access_code=trim(p_access_code)
  ) then
    raise exception '閲覧コードが違うか、結果はまだ公開されていません。';
  end if;

  return query
  select sessions.session_name
  from (
    select settings.session_name, 0 as display_order
    from public.workshop_settings as settings where settings.id=true
    union
    select r.answers->>'workshopSessionName', 1 as display_order
    from public.responses as r
    where btrim(coalesce(r.answers->>'workshopSessionName',''))<>''
  ) as sessions
  group by sessions.session_name
  order by min(sessions.display_order), sessions.session_name;
end; $$;

create or replace function public.get_workshop_results_for_session(p_access_code text, p_session_name text)
returns table(question_number integer, category text, question_text text, entered_count bigint, not_entered_count bigint, response_count bigint, five_keys jsonb)
language plpgsql security definer set search_path=public as $$
begin
  if not exists (
    select 1 from public.workshop_settings
    where id=true and is_results_published=true and access_code=trim(p_access_code)
  ) then
    raise exception '閲覧コードが違うか、結果はまだ公開されていません。';
  end if;

  return query
  with items as (
    select (q.ordinality-1)::integer n, q.item->>'category' c, q.item->>'text' t,
      r.answers->'answers'->>(q.ordinality-1)::text a, r.answers->'responseKeys'->(q.ordinality-1)::text k
    from public.responses r cross join lateral jsonb_array_elements(r.answers->'questions') with ordinality q(item,ordinality)
    where r.answers->>'workshopSessionName'=trim(p_session_name)
  ), summary as (
    select min(n)::integer n,c,t,count(*) filter(where a='入る')::bigint e,count(*) filter(where a='入らない')::bigint ne,count(*)::bigint rc
    from items where a in ('入る','入らない') group by c,t
  ), keys as (
    select c,t,jsonb_object_agg(key_name,key_count) fk
    from (
      select c,t,key_name,count(*)::bigint key_count
      from items cross join lateral jsonb_array_elements_text(coalesce(k,'[]'::jsonb)) x(key_name)
      where a='入る' group by c,t,key_name
    ) z group by c,t
  )
  select s.n,s.c,s.t,s.e,s.ne,s.rc,coalesce(keys.fk,'{}'::jsonb)
  from summary s left join keys on keys.c=s.c and keys.t=s.t order by s.c,s.t;
end; $$;

create or replace function public.get_workshop_optional_texts_for_session(p_access_code text, p_session_name text)
returns table(category text, question_text text, input_type text, content text)
language plpgsql security definer set search_path=public as $$
begin
  if not exists (
    select 1 from public.workshop_settings
    where id=true and is_results_published=true and access_code=trim(p_access_code)
  ) then
    raise exception '閲覧コードが違うか、結果はまだ公開されていません。';
  end if;

  return query
  select q.item->>'category',q.item->>'text','関連するエピソード（任意）'::text,e.value
  from public.responses r cross join lateral jsonb_each_text(coalesce(r.answers->'episodes','{}'::jsonb)) e(question_index,value)
  join lateral jsonb_array_elements(r.answers->'questions') with ordinality q(item,ordinality) on q.ordinality-1=e.question_index::integer
  where r.answers->>'workshopSessionName'=trim(p_session_name) and btrim(e.value)<>''
  union all
  select null::text,null::text,'最後に入力した気になった対応（任意）'::text,r.answers->>'fieldSuggestion'
  from public.responses r
  where r.answers->>'workshopSessionName'=trim(p_session_name) and btrim(coalesce(r.answers->>'fieldSuggestion',''))<>'';
end; $$;

revoke all on function public.get_workshop_result_sessions(text) from public;
revoke all on function public.get_workshop_results_for_session(text, text) from public;
revoke all on function public.get_workshop_optional_texts_for_session(text, text) from public;
grant execute on function public.get_workshop_result_sessions(text) to anon, authenticated;
grant execute on function public.get_workshop_results_for_session(text, text) to anon, authenticated;
grant execute on function public.get_workshop_optional_texts_for_session(text, text) to anon, authenticated;
