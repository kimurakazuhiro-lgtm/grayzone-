-- 管理者が毎回、出題する12問を選ぶための設定です。
-- Supabase の SQL Editor で1回だけ実行してください。

alter table public.workshop_settings
add column if not exists question_indexes integer[] not null default array[0, 1, 9, 10, 17, 18, 25, 26, 32, 33, 41, 42];

drop function if exists public.admin_workshop_settings();

create function public.admin_workshop_settings()
returns table (
  access_code text,
  is_results_published boolean,
  question_count integer,
  question_indexes integer[]
)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_workshop_admin() then raise exception '管理者権限がありません。'; end if;
  return query select settings.access_code, settings.is_results_published, settings.question_count, settings.question_indexes
  from public.workshop_settings as settings where settings.id = true;
end;
$$;

drop function if exists public.update_workshop_settings(text, boolean, integer);
drop function if exists public.update_workshop_settings(text, boolean, integer, integer);
drop function if exists public.update_workshop_settings(text, boolean, integer, integer[]);

create function public.update_workshop_settings(
  p_access_code text,
  p_is_results_published boolean,
  p_question_count integer,
  p_question_indexes integer[]
)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_workshop_admin() then raise exception '管理者権限がありません。'; end if;
  if char_length(trim(p_access_code)) < 6 then raise exception '閲覧コードは6文字以上にしてください。'; end if;
  if coalesce(array_length(p_question_indexes, 1), 0) <> 12
    or (select count(distinct question_index) from unnest(p_question_indexes) as question_index) <> 12
    or exists (select 1 from unnest(p_question_indexes) as question_index where question_index < 0 or question_index > 44) then
    raise exception '質問は重複なしで12問選択してください。';
  end if;
  update public.workshop_settings set
    access_code = trim(p_access_code), is_results_published = p_is_results_published,
    question_count = 12, question_indexes = p_question_indexes, updated_at = now()
  where id = true;
end;
$$;

create or replace function public.public_workshop_question_indexes()
returns integer[] language sql security definer set search_path = public as $$
  select question_indexes from public.workshop_settings where id = true;
$$;

revoke all on function public.admin_workshop_settings() from public;
revoke all on function public.update_workshop_settings(text, boolean, integer, integer[]) from public;
revoke all on function public.public_workshop_question_indexes() from public;
grant execute on function public.admin_workshop_settings() to authenticated;
grant execute on function public.update_workshop_settings(text, boolean, integer, integer[]) to authenticated;
grant execute on function public.public_workshop_question_indexes() to anon, authenticated;
