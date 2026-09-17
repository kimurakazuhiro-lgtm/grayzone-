-- 回答者が同じブラウザ上で、自分の送信済み回答を編集するための設定です。
-- Supabase の SQL Editor で 1 回だけ実行してください。

create or replace function public.update_workshop_response(
  p_edit_token text,
  p_answers jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(trim(p_edit_token)) < 20 then
    raise exception '回答を特定できませんでした。';
  end if;

  if coalesce(p_answers ->> 'editToken', '') <> p_edit_token then
    raise exception '回答を特定できませんでした。';
  end if;

  update public.responses
  set answers = p_answers
  where answers ->> 'editToken' = p_edit_token;

  if not found then
    raise exception '編集できる回答が見つかりませんでした。';
  end if;
end;
$$;

revoke all on function public.update_workshop_response(text, jsonb) from public;
grant execute on function public.update_workshop_response(text, jsonb) to anon, authenticated;
