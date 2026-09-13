-- 閲覧コード方式の研修結果公開設定です。
-- このSQLをSupabaseの「SQL Editor」で1回実行してください。

-- 研修ごとの公開状態と閲覧コードを保存します。
create table if not exists public.workshop_settings (
  id boolean primary key default true check (id = true),
  is_results_published boolean not null default false,
  access_code text not null default 'CHANGE-ME',
  question_count integer not null default 10 check (question_count between 8 and 12),
  updated_at timestamptz not null default now()
);

insert into public.workshop_settings (id)npm.cmd run dev
values (true)
on conflict (id) do nothing;

alter table public.workshop_settings enable row level security;

-- すでにこのSQLを実行したプロジェクトにも、質問数の設定を追加します。
alter table public.workshop_settings
add column if not exists question_count integer not null default 10;

alter table public.workshop_settings
drop constraint if exists workshop_settings_question_count_check;

alter table public.workshop_settings
add constraint workshop_settings_question_count_check
check (question_count between 8 and 12);

-- 管理者として結果を操作できるSupabaseログイン利用者を登録します。
create table if not exists public.workshop_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.workshop_admins enable row level security;

create or replace function public.is_workshop_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workshop_admins
    where user_id = auth.uid()
  );
$$;

-- 既存の集計関数は、コードを入力しない利用者からは実行できないようにします。
revoke all on function public.question_results() from anon, authenticated;

create or replace function public.get_workshop_results(p_access_code text)
returns table (
  question_number integer,
  category text,
  question_text text,
  entered_count bigint,
  not_entered_count bigint,
  response_count bigint,
  five_keys jsonb
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.workshop_settings
    where id = true
      and is_results_published = true
      and access_code = trim(p_access_code)
  ) then
    raise exception '閲覧コードが違うか、結果はまだ公開されていません。';
  end if;

  return query select * from public.question_results();
end;
$$;

revoke all on function public.get_workshop_results(text) from public;
grant execute on function public.get_workshop_results(text) to anon, authenticated;

-- グループ記録も、公開中かつ正しい閲覧コードの場合だけ保存できます。
drop policy if exists "Allow public insert workshop notes" on public.workshop_notes;

create or replace function public.save_workshop_note(
  p_access_code text,
  p_category text,
  p_question_text text,
  p_insights text,
  p_improvements text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_id bigint;
begin
  if not exists (
    select 1
    from public.workshop_settings
    where id = true
      and is_results_published = true
      and access_code = trim(p_access_code)
  ) then
    raise exception '閲覧コードが違うか、結果はまだ公開されていません。';
  end if;

  insert into public.workshop_notes (category, question_text, insights, improvements)
  values (p_category, p_question_text, p_insights, p_improvements)
  returning id into saved_id;

  return saved_id;
end;
$$;

revoke all on function public.save_workshop_note(text, text, text, text, text) from public;
grant execute on function public.save_workshop_note(text, text, text, text, text) to anon, authenticated;

-- 以下は管理者ログイン済みの利用者だけが利用できる関数です。
drop function if exists public.admin_workshop_settings();

create function public.admin_workshop_settings()
returns table (
  access_code text,
  is_results_published boolean,
  question_count integer
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
  select settings.access_code, settings.is_results_published, settings.question_count
  from public.workshop_settings as settings
  where settings.id = true;
end;
$$;

drop function if exists public.update_workshop_settings(text, boolean);

create function public.update_workshop_settings(
  p_access_code text,
  p_is_results_published boolean,
  p_question_count integer
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

  if p_question_count not between 8 and 12 then
    raise exception '質問数は8問から12問にしてください。';
  end if;

  update public.workshop_settings
  set
    access_code = trim(p_access_code),
    is_results_published = p_is_results_published,
    question_count = p_question_count,
    updated_at = now()
  where id = true;
end;
$$;

revoke all on function public.admin_workshop_settings() from public;
revoke all on function public.update_workshop_settings(text, boolean, integer) from public;
grant execute on function public.admin_workshop_settings() to authenticated;
grant execute on function public.update_workshop_settings(text, boolean, integer) to authenticated;

-- 回答者の開始画面には、質問数だけを渡します。
create or replace function public.public_question_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select question_count from public.workshop_settings where id = true;
$$;

revoke all on function public.public_question_count() from public;
grant execute on function public.public_question_count() to anon, authenticated;

-- 最後に、Supabase Authenticationで作成した管理者のメールアドレスを使って、
-- 下のYOUR_ADMIN_EMAILを置き換えて1回だけ実行してください。
-- insert into public.workshop_admins (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict (user_id) do nothing;
