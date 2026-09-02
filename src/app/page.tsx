"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const questions = [
  {
    category: "利用者に対する言動について",
    text: "利用者さんにため口で話してしまうことがある。",
  },
  {
    category: "利用者に対する言動について",
    text: "利用者さんにメリットを伝えずに、デメリットのみ伝える。",
  },
  {
    category: "利用者に対する言動について",
    text: "お風呂に入っていない利用者さんに「臭いよ」と伝える。",
  },
  {
    category: "利用者に対する言動について",
    text: "ゴキブリが出た時に「うわー！無理ー！」と叫ぶ。",
  },
  {
    category: "利用者に対する言動について",
    text: "利用者さんの話が長すぎる時に、時々聞いていないことがある。",
  },
  {
    category: "利用者に対する言動について",
    text: "大声で電話対応をし、周囲に話が聞こえてしまう。",
  },
  {
    category: "利用者に対する言動について",
    text: "利用者さんや家族の言動を冗談で返したり、笑ったりしている。",
  },
  {
    category: "利用者に対する言動について",
    text: "面談後、その方の話にストレスが溜まり、本人不在の場で悪口を言ってしまう。",
  },
  {
    category: "利用者に対する言動について",
    text: "利用者さんの行動特性を笑い話にしたり、真似をしてしまう。",
  },
  {
    category: "支援の適切さについて",
    text: "定期的な個別支援会議の開催を忘れてしまうことがある。",
  },
  {
    category: "支援の適切さについて",
    text: "煙草を吸いたい気持ちがある利用者さんに、煙草を吸う環境に持っていかないようにする。",
  },
  {
    category: "支援の適切さについて",
    text: "本人は自宅に帰りたいと言うが、グループホームでの生活を継続してもらう。",
  },
  {
    category: "支援の適切さについて",
    text: "犯罪等の行為をする人に、相手のことも考え怒って指導した。",
  },
  {
    category: "支援の適切さについて",
    text: "調子が悪い時に、入院ありきで支援をすること。",
  },
  {
    category: "支援の適切さについて",
    text: "計画書の作成の際に、課題解決のみの計画内容に終始している。",
  },
  {
    category: "支援の適切さについて",
    text: "利用者さんがまだ話している途中でも、予定時間が来たので面談を終える。",
  },
  {
    category: "支援の適切さについて",
    text: "利用者さんが混乱するからという理由で、サービス依頼があっても「難しい」と伝えた。",
  },
  {
    category: "プライバシーと情報管理",
    text: "利用者さんの郵便物を開けた。",
  },
  {
    category: "プライバシーと情報管理",
    text: "家族が利用者さんの口座のお金を家族の通帳に移すよう頼んできたので、そのようにした。",
  },
  {
    category: "プライバシーと情報管理",
    text: "訪問時、提供された飲み物を飲まないで断る。",
  },
  {
    category: "プライバシーと情報管理",
    text: "インターフォンを鳴らさずに玄関を開けて声掛けすることがある。",
  },
  {
    category: "プライバシーと情報管理",
    text: "利用者さん宅にスリッパを履いて上がり、捨てられる靴下を準備した。",
  },
  {
    category: "プライバシーと情報管理",
    text: "汚い書類に触った後、たくさんアルコールを使って本人の前で手を消毒した。",
  },
  {
    category: "プライバシーと情報管理",
    text: "利用者さんのプライバシーに配慮せず、職員に話す、写真を撮る。",
  },
  {
    category: "プライバシーと情報管理",
    text: "同室で電話相談中に他の相談員の声が聞こえてしまう。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "本人は自宅に帰りたいと言うが、家族の意向でグループホームでの生活を続けさせた。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "家庭環境によってヘルプの時間数を増やすことをためらった。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "家族の強い意向が重視され、本人の支援に影響が出た。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "利用者さんの意向を聞かずに、家族の意向を優先する。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "「どうせ言ってもわからない」と決めつけてしまうことがある。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "サービス等利用計画書が、本人には読めない・理解できない形で記入されている。",
  },
  {
    category: "利用者の意向を尊重しない対応",
    text: "児童ケースの放課後等デイサービスのニーズが、親のメリットのみになっている。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者を急かすような声掛けをしたが、もっと早く準備すればよかったかもと反省した。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "どのようなことでも本人の行動に対して「すごいですね」と言ってしまう。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者の自己責任と言って、見守り支援に終始することがある。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者さん宅が汚いので、つま先で歩いたり、渡された座布団に座らなかった。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者さん宅で、部屋をキョロキョロと見回すことがある。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "トイレ・浴室の掃除を強く促し、施設等が汚れた時の費用負担を言う。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者さんの電話が多く、居留守を使った。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "長時間の電話相談に「もう出ます」と嘘をついて切る。",
  },
  {
    category: "支援方法や態度の不適切さ",
    text: "利用者が話をしている途中で、予定時間が来たので面談を終える。",
  },
  {
    category: "支援の計画や報告に関する改善の必要性",
    text: "関係機関への連絡を忘れてしまうことがある。",
  },
  {
    category: "支援の計画や報告に関する改善の必要性",
    text: "支援の一環として入院ありきで対応してしまう。",
  },
  {
    category: "支援の計画や報告に関する改善の必要性",
    text: "利用者さんから「事業所を探して」と言われたが、探そうとしなかった。",
  },
  {
    category: "支援の計画や報告に関する改善の必要性",
    text: "サービス等利用計画書が本人には読めない形で記入されている。",
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

 const goNext = async () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    return;
  }

  const { error } = await supabase.from("responses").insert({
    answers: { answers, episodes },
  });

  if (error) {
    alert("回答を保存できませんでした。もう一度お試しください。");
    return;
  }

  setFinished(true);
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