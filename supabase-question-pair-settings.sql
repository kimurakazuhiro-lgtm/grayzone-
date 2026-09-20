-- 月ごとに「各大問の何番目の質問を出すか」を切り替える設定です。
-- Supabase の SQL Editor で1回だけ実行してください。

alter table public.workshop_settings
add column if not exists question_pair integer not null default 1;

alter table public.workshop_settings
drop constraint if exists workshop_settings_question_pair_check;

alter table public.workshop_settings
add constraint workshop_settings_question_pair_check
check (question_pair in (1, 2));

drop function if exists public.admin_workshop_settings();

create function public.admin_workshop_settings()
returns table (
  access_code text,
  is_results_published boolean,
  question_count integer,
  question_pair integer
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_workshop_admin() then
    raise exception '管理者権限がありません。';
  end if;

  return query
  select settings.access_code, settings.is_results_published, settings.question_count, settings.question_pair
  from public.workshop_settings as settings
  where settings.id = true;
end;
$$;

drop function if exists public.update_workshop_settings(text, boolean, integer);
drop function if exists public.update_workshop_settings(text, boolean, integer, integer);

create function public.update_workshop_settings(
  p_access_code text,
  p_is_results_published boolean,
  p_question_count integer,
  p_question_pair integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_workshop_admin() then
    raise exception '管理者権限がありません。';
  end if;

  if char_length(trim(p_access_code)) < 6 then
    raise exception '閲覧コードは6文字以上にしてください。';
  end if;

  if p_question_pair not in (1, 2) then
    raise exception '質問の組を選択してください。';
  end if;

  update public.workshop_settings
  set
    access_code = trim(p_access_code),
    is_results_published = p_is_results_published,
    question_count = 12,
    question_pair = p_question_pair,
    updated_at = now()
  where id = true;
end;
$$;

create or replace function public.public_workshop_question_pair()
returns integer
language sql
security definer
set search_path = public
as $$
  select question_pair from public.workshop_settings where id = true;
$$;

revoke all on function public.admin_workshop_settings() from public;
revoke all on function public.update_workshop_settings(text, boolean, integer, integer) from public;
revoke all on function public.public_workshop_question_pair() from public;
grant execute on function public.admin_workshop_settings() to authenticated;
grant execute on function public.update_workshop_settings(text, boolean, integer, integer) to authenticated;
grant execute on function public.public_workshop_question_pair() to anon, authenticated;
