"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");

  if (!started) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-emerald-700">
            グレーゾーンアンケート
          </p>

          <h1 className="text-3xl font-bold leading-tight">
            現場で気になることを、
            <br />
            一緒に考えるためのアンケートです。
          </h1>

          <p className="mt-6 leading-7 text-slate-600">
            日々の支援で感じる「少し気になること」を集め、
            対話やよりよい支援につなげます。
            正解・不正解を決めるためのものではありません。
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-8 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
          >
            回答を始める
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            回答には数分かかります。
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">1 / 45</p>

        <p className="mt-6 text-sm font-semibold text-slate-500">
          利用者に対する言動について
        </p>

        <h1 className="mt-2 text-2xl font-bold leading-tight">
          利用者さんにため口で話してしまうことがある。
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          直近2か月を振り返り、あなたの考えに近いものを選んでください。
        </p>

        <div className="mt-6 grid gap-3">
          {["当てはまる", "当てはまらない", "わからない"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setAnswer(item)}
              className={`rounded-xl border px-5 py-4 text-left font-bold ${
                answer === item
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="mt-7 block text-sm font-semibold text-slate-700">
          関連するエピソード（任意）
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
            rows={4}
            placeholder="思い出した場面があれば入力してください"
          />
        </label>

        <button
          type="button"
          disabled={!answer}
          className="mt-7 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white disabled:bg-slate-300"
        >
          次の設問へ
        </button>
      </section>
    </main>
  );
}