"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type WorkshopSettings = {
  access_code: string;
  is_results_published: boolean;
  question_count: number;
};

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = async () => {
    setIsLoading(true);
    setMessage("");

    const { data, error } = await supabase.rpc("admin_workshop_settings");

    if (error || !data?.[0]) {
      setMessage("管理者権限がありません。管理者の登録設定を確認してください。");
    } else {
      const settings = data[0] as WorkshopSettings;
      setAccessCode(settings.access_code);
      setIsPublished(settings.is_results_published);
      setQuestionCount(settings.question_count);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session) {
        await loadSettings();
      } else {
        setIsLoading(false);
      }
    };

    void loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") {
        setSession(nextSession);
        setIsPasswordRecovery(true);
        setIsLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    setMessage("");
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      setMessage("ログインできませんでした。メールアドレスとパスワードを確認してください。");
      setIsLoading(false);
      return;
    }

    setSession(data.session);
    await loadSettings();
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setMessage("");

    const { error } = await supabase.rpc("update_workshop_settings", {
      p_access_code: accessCode,
      p_is_results_published: isPublished,
      p_question_count: questionCount,
    });

    setMessage(error ? error.message : "公開設定を保存しました。");
    setIsSaving(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setPassword("");
    setIsPasswordRecovery(false);
    setMessage("");
  };

  const requestPasswordReset = async () => {
    if (!email.trim()) {
      setMessage("管理者メールアドレスを入力してください。");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin`,
    });

    setMessage(
      error
        ? "再設定メールを送信できませんでした。時間をおいてもう一度お試しください。"
        : "再設定用メールを送信しました。メール内のリンクを開いて、新しいパスワードを設定してください。",
    );
  };

  const changePassword = async () => {
    if (!isPasswordRecovery && !currentPassword) {
      setPasswordMessage("現在のパスワードを入力してください。");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage("新しいパスワードは6文字以上で入力してください。");
      return;
    }

    setPasswordMessage("");
    const { error } = await supabase.auth.updateUser(
      isPasswordRecovery
        ? { password: newPassword }
        : { current_password: currentPassword, password: newPassword },
    );

    if (error) {
      setPasswordMessage(`パスワードを変更できませんでした：${error.message}`);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setIsPasswordRecovery(false);
    setPasswordMessage("パスワードを変更しました。次回から新しいパスワードでログインしてください。");
  };

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
        <h1 className="mt-4 text-3xl font-bold">管理者設定</h1>
        <p className="mt-4 leading-7 text-slate-600">
          研修結果を見せるタイミングと、参加者に伝える閲覧コードを管理します。
        </p>

        {!session && !isLoading && (
          <div className="mt-8 grid gap-5">
            <label className="text-sm font-semibold text-slate-700">
              管理者メールアドレス
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              パスワード
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              />
            </label>
            <button
              type="button"
              onClick={signIn}
              className="rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
            >
              管理者としてログイン
            </button>
            <button
              type="button"
              onClick={requestPasswordReset}
              className="font-bold text-emerald-700 underline"
            >
              パスワードを忘れた場合
            </button>
          </div>
        )}

        {session && isPasswordRecovery && !isLoading && (
          <div className="mt-8 grid gap-5">
            <p className="font-semibold text-slate-700">新しい管理者パスワードを設定してください。</p>
            <label className="text-sm font-semibold text-slate-700">
              新しいパスワード（6文字以上）
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                minLength={6}
                autoComplete="new-password"
              />
            </label>
            <button
              type="button"
              onClick={changePassword}
              disabled={newPassword.length < 6}
              className="rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white disabled:bg-slate-300"
            >
              新しいパスワードを保存する
            </button>
            {passwordMessage && <p className="text-sm font-semibold text-slate-700">{passwordMessage}</p>}
          </div>
        )}

        {session && !isPasswordRecovery && !isLoading && !message.includes("権限がありません") && (
          <div className="mt-8 grid gap-6">
            <label className="text-sm font-semibold text-slate-700">
              参加者へ伝える閲覧コード
              <input
                type="text"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                minLength={6}
              />
              <span className="mt-2 block font-normal text-slate-500">6文字以上の、推測されにくいコードにしてください。</span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) => setIsPublished(event.target.checked)}
                className="mt-1 h-5 w-5"
              />
              <span>
                <span className="block font-bold">結果を公開する</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  オンにすると、閲覧コードを知る参加者が結果画面を見られます。
                </span>
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700">
              1回の研修で出す質問数
              <select
                value={questionCount}
                onChange={(event) => setQuestionCount(Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              >
                {[8, 9, 10, 11, 12].map((count) => (
                  <option key={count} value={count}>{count}問</option>
                ))}
              </select>
              <span className="mt-2 block font-normal text-slate-500">
                次に回答を始める参加者から、この質問数がランダムに出題されます。
              </span>
            </label>

            <button
              type="button"
              onClick={saveSettings}
              disabled={isSaving || accessCode.trim().length < 6}
              className="rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800 disabled:bg-slate-300"
            >
              {isSaving ? "保存中です..." : "公開設定を保存する"}
            </button>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-bold">管理者パスワードを変更する</p>
              <label className="mt-3 block text-sm font-semibold text-slate-700">
                現在のパスワード
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                  autoComplete="current-password"
                />
              </label>
              <label className="mt-3 block text-sm font-semibold text-slate-700">
                新しいパスワード（6文字以上）
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                  minLength={6}
                  autoComplete="new-password"
                />
              </label>
              <button
                type="button"
                onClick={changePassword}
                disabled={!currentPassword || newPassword.length < 6}
                className="mt-3 w-full rounded-xl border border-emerald-700 px-5 py-3 font-bold text-emerald-700 disabled:border-slate-200 disabled:text-slate-400"
              >
                新しいパスワードに変更する
              </button>
              {passwordMessage && <p className="mt-3 text-sm font-semibold text-slate-700">{passwordMessage}</p>}
            </div>
            <Link href="/results" className="text-center font-bold text-emerald-700 underline">
              閲覧コード入力画面を開く
            </Link>
            <button type="button" onClick={signOut} className="font-bold text-slate-600 underline">
              ログアウト
            </button>
          </div>
        )}

        {isLoading && <p className="mt-8 text-slate-600">読み込み中です。</p>}
        {message && <p className="mt-6 text-sm font-semibold text-slate-700">{message}</p>}
      </section>
    </main>
  );
}
