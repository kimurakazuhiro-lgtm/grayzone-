"use client";

import { useState } from "react";

const questions = [
  {
    category: "利用者に対する言動について",
    text: "利用者さんにため口で話してしまうことがある。",
  },
  {
    category: "利用者に対する言動について",
    text: "利用者さんにメリットを伝えずに、デメリットのみ伝える。",
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [episodes, setEpisodes] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion] ?? "";

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

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

  if (finished) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">
            グレーゾーンアンケート
          </p>
          <h1 className="mt-4 text-3xl font-bold">回答を受け取りました</h1>
          <p className="mt-5 leading-7 text-slate-600">
            ご回答ありがとうございます。
            これは動作確認用の完了画面です。
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">
          {currentQuestion + 1} / 45
        </p>

        <p className="mt-6 text-sm font-semibold text-slate-500">
          {question.category}
        </p>

        <h1 className="mt-2 text-2xl font-bold leading-tight">
          {question.text}
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          直近2か月を振り返り、あなたの考えに近いものを選んでください。
        </p>

        <div className="mt-6 grid gap-3">
          {["当てはまる", "当てはまらない", "わからない"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setAnswers((previous) => ({
                  ...previous,
                  [currentQuestion]: item,
                }))
              }
              className={`rounded-xl border px-5 py-4 text-left font-bold ${
                selectedAnswer === item
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
            value={episodes[currentQuestion] ?? ""}
            onChange={(event) =>
              setEpisodes((previous) => ({
                ...previous,
                [currentQuestion]: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
            rows={4}
            placeholder="思い出した場面があれば入力してください"
          />
        </label>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="rounded-xl border border-slate-300 px-5 py-4 font-bold disabled:border-slate-100 disabled:text-slate-300"
          >
            戻る
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!selectedAnswer}
            className="flex-1 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white disabled:bg-slate-300"
          >
            {currentQuestion === questions.length - 1
              ? "回答を確認する"
              : "次の設問へ"}
          </button>
        </div>
      </section>
    </main>
  );
}