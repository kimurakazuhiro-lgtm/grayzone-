-- 結果閲覧画面で、参加者の任意入力と選択した5Keysを表示するための設定です。
-- Supabase の SQL Editor で 1 回だけ実行してください。

drop function if exists public.get_workshop_optional_texts(text);

create or replace function public.get_workshop_optional_texts(p_access_code text)
returns table (
  category text,
  question_text text,
  input_type text,
  content text,
  selected_keys jsonb
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

  return query
  select
    question.item ->> 'category' as category,
    question.item ->> 'text' as question_text,
    '関連するエピソード（任意）'::text as input_type,
    episode.value as content,
    coalesce(response.answers -> 'responseKeys' -> episode.question_index, '[]'::jsonb) as selected_keys
  from public.responses as response
  cross join lateral jsonb_each_text(coalesce(response.answers -> 'episodes', '{}'::jsonb))
    as episode(question_index, value)
  join lateral jsonb_array_elements(response.answers -> 'questions') with ordinality
    as question(item, ordinality)
    on question.ordinality - 1 = episode.question_index::integer
  where btrim(episode.value) <> ''

  union all

  select
    null::text as category,
    null::text as question_text,
    '最後に入力した気になった対応（任意）'::text as input_type,
    response.answers ->> 'fieldSuggestion' as content,
    '[]'::jsonb as selected_keys
  from public.responses as response
  where btrim(coalesce(response.answers ->> 'fieldSuggestion', '')) <> '';
end;
$$;

revoke all on function public.get_workshop_optional_texts(text) from public;
grant execute on function public.get_workshop_optional_texts(text) to anon, authenticated;
