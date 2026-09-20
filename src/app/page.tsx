"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

const serviceTypes = ["居宅", "入所", "相談", "就労", "放デイ", "児発", "GH"];

const fiveKeys = [
  { name: "安全", description: "これは本当に安全か？" },
  { name: "尊厳", description: "これ、自分がされたらどうか？" },
  { name: "ルール", description: "ルールや手順を確認しているか？" },
  { name: "主体", description: "これは誰の意思で決まっているか？" },
  { name: "ワクワク", description: "これは何につながっているか？" },
];

const fiveKeyCardStyles: Record<string, string> = {
  安全: "border-lime-300 bg-lime-100",
  尊厳: "border-sky-300 bg-sky-100",
  ルール: "border-violet-300 bg-violet-100",
  主体: "border-amber-300 bg-amber-100",
  ワクワク: "border-rose-300 bg-rose-100",
};

const defaultQuestionsPerSurvey = 10;

type ResultRow = {
  question_number: number;
  category: string;
  question_text: string;
  entered_count: number;
  not_entered_count: number;
  response_count: number;
  five_keys: Record<string, number>;
};

type OptionalText = {
  category: string | null;
  question_text: string | null;
  input_type: string;
  content: string;
};

type ExerciseRecord = {
  category: string;
  questionText: string;
  insights: string;
  improvements: string;
};

function selectRandomQuestions(count: number) {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions.slice(0, count);
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [questionCount, setQuestionCount] = useState(defaultQuestionsPerSurvey);
  const [surveyQuestions, setSurveyQuestions] = useState(() =>
    questions.slice(0, defaultQuestionsPerSurvey),
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [responseKeys, setResponseKeys] = useState<Record<number, string[]>>({});
  const [episodes, setEpisodes] = useState<Record<number, string>>({});
  const [fieldSuggestion, setFieldSuggestion] = useState("");
  const [showFinalSuggestion, setShowFinalSuggestion] = useState(false);
  const pathname = usePathname();
  const isResultsRoute = pathname === "/results";
  const [resultRows, setResultRows] = useState<ResultRow[]>([]);
  const [optionalTexts, setOptionalTexts] = useState<OptionalText[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState("");
  const [resultsAccessCode, setResultsAccessCode] = useState("");
  const [grantedAccessCode, setGrantedAccessCode] = useState("");
  const [fiveKeyCardOrders, setFiveKeyCardOrders] = useState<Record<string, string[]>>({});
  const [selectedFiveKeyCard, setSelectedFiveKeyCard] = useState<{
    questionId: string;
    keyName: string;
  } | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ResultRow | null>(null);
  const [exerciseTopics, setExerciseTopics] = useState<ResultRow[]>([]);
  const [exerciseTopicIndex, setExerciseTopicIndex] = useState(0);
  const [isExerciseScreen, setIsExerciseScreen] = useState(false);
  const [isExerciseReviewScreen, setIsExerciseReviewScreen] = useState(false);
  const [isExerciseEndConfirmationOpen, setIsExerciseEndConfirmationOpen] = useState(false);
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);
  const [exerciseDrafts, setExerciseDrafts] = useState<
    Record<string, { insights: string; improvements: string }>
  >({});
  const [savedExerciseTopicTexts, setSavedExerciseTopicTexts] = useState<string[]>([]);
  const [exerciseLimitQuestion, setExerciseLimitQuestion] = useState("");
  const [groupInsights, setGroupInsights] = useState("");
  const [improvementIdeas, setImprovementIdeas] = useState("");
  const [noteStatus, setNoteStatus] = useState("");
  const [isExerciseNoteSaved, setIsExerciseNoteSaved] = useState(false);
  const [isUnsavedExerciseConfirmationOpen, setIsUnsavedExerciseConfirmationOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isReviewingSubmittedAnswers, setIsReviewingSubmittedAnswers] = useState(false);
  const [isEditingSubmittedResponse, setIsEditingSubmittedResponse] = useState(false);
  const [editToken, setEditToken] = useState("");
  const [isEndConfirmationOpen, setIsEndConfirmationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const question = surveyQuestions[currentQuestion];
  const selectedAnswer = answers[currentQuestion] ?? "";
  const selectedKeys = responseKeys[currentQuestion] ?? [];
  const needsKeys = selectedAnswer === "入る";
  const topExerciseRows = [...resultRows]
    .sort((first, second) => {
      const countDifference = Number(second.entered_count) - Number(first.entered_count);

      return countDifference !== 0
        ? countDifference
        : first.question_text.localeCompare(second.question_text, "ja");
    })
    .slice(0, 2);

  const goNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    setShowFinalSuggestion(true);
  };

  const startSurvey = async () => {
    const { data } = await supabase.rpc("public_question_count");
    const latestQuestionCount = Number(data);
    const count =
      Number.isInteger(latestQuestionCount) && latestQuestionCount >= 8 && latestQuestionCount <= 12
        ? latestQuestionCount
        : questionCount;

    setQuestionCount(count);
    setSurveyQuestions(selectRandomQuestions(count));
    setEditToken(crypto.randomUUID());
    setStarted(true);
  };

  const submitResponse = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage(
      isEditingSubmittedResponse
        ? "変更を保存しています。画面はそのままでお待ちください。"
        : "回答を送信しています。画面はそのままでお待ちください。",
    );

    const responseData = {
      serviceType,
      questions: surveyQuestions,
      answers,
      responseKeys,
      episodes,
      fieldSuggestion,
      editToken,
    };

    try {
      const response = await Promise.race([
        isEditingSubmittedResponse
          ? supabase.rpc("update_workshop_response", {
              p_edit_token: editToken,
              p_answers: responseData,
            })
          : supabase.from("responses").insert({ answers: responseData }),
        new Promise<null>((resolve) => {
          window.setTimeout(() => resolve(null), 15000);
        }),
      ]);

      if (response === null) {
        setSubmitMessage(
          "保存に時間がかかっています。通信を確認して、もう一度「回答を送信する」を押してください。",
        );
        return;
      }

      if (response.error) {
        setSubmitMessage("回答を保存できませんでした。通信を確認して、もう一度お試しください。");
        return;
      }

      setShowFinalSuggestion(false);
      setSubmitMessage("");
      setIsEditingSubmittedResponse(false);
      setFinished(true);
    } catch {
      setSubmitMessage(
        "回答の送信中に通信エラーが発生しました。通信を確認して、もう一度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const endResponse = () => {
    setIsEndConfirmationOpen(false);
    setIsReviewingSubmittedAnswers(false);
    setIsEditingSubmittedResponse(false);
    setFinished(false);
    setShowFinalSuggestion(false);
    setStarted(false);
    setServiceType("");
    setSurveyQuestions(questions.slice(0, defaultQuestionsPerSurvey));
    setCurrentQuestion(0);
    setAnswers({});
    setResponseKeys({});
    setEpisodes({});
    setFieldSuggestion("");
    setEditToken("");
  };

  useEffect(() => {
    if (isResultsRoute) return;

    const loadQuestionCount = async () => {
      const { data } = await supabase.rpc("public_question_count");

      if (typeof data === "number" && data >= 8 && data <= 12) {
        setQuestionCount(data);
      }
    };

    void loadQuestionCount();
  }, [isResultsRoute]);

  const loadResultsWithCode = async () => {
    const accessCode = resultsAccessCode.trim();

    if (!accessCode) {
      setResultsError("管理者から伝えられた閲覧コードを入力してください。");
      return;
    }

    setIsLoadingResults(true);
    setResultsError("");

    const { data, error } = await supabase.rpc("get_workshop_results", {
      p_access_code: accessCode,
    });

    if (error) {
      setResultsError("閲覧コードが違うか、結果はまだ公開されていません。");
      setResultRows([]);
      setOptionalTexts([]);
      setGrantedAccessCode("");
    } else {
      setGrantedAccessCode(accessCode);
      setResultRows((data ?? []) as ResultRow[]);
      const { data: optionalTextData } = await supabase.rpc("get_workshop_optional_texts", {
        p_access_code: accessCode,
      });
      setOptionalTexts((optionalTextData ?? []) as OptionalText[]);
    }

    setIsLoadingResults(false);
  };

  const toggleExerciseTopic = (row: ResultRow) => {
    const isSelected = exerciseTopics.some((item) => item.question_text === row.question_text);
    const willSelectSecondTopic = !isSelected && exerciseTopics.length === 1;

    if (!isSelected && exerciseTopics.length === 2) {
      setExerciseLimitQuestion(row.question_text);
      return;
    }

    setExerciseLimitQuestion("");
    if (isSelected) {
      setExerciseTopics((previous) => previous.filter((item) => item.question_text !== row.question_text));
      return;
    }

    setExerciseTopics((previous) => [...previous, row]);
    if (willSelectSecondTopic) {
      window.setTimeout(() => {
        document.getElementById("exercise-start")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    }
  };

  const moveFiveKeyCard = (questionId: string, keyName: string) => {
    if (!selectedFiveKeyCard) {
      setSelectedFiveKeyCard({ questionId, keyName });
      return;
    }

    if (selectedFiveKeyCard.questionId !== questionId) {
      setSelectedFiveKeyCard({ questionId, keyName });
      return;
    }

    if (selectedFiveKeyCard.keyName === keyName) {
      setSelectedFiveKeyCard(null);
      return;
    }

    setFiveKeyCardOrders((previous) => {
      const currentOrder = previous[questionId] ?? fiveKeys.map((key) => key.name);
      const nextOrder = currentOrder.filter((item) => item !== selectedFiveKeyCard.keyName);
      const targetIndex = nextOrder.indexOf(keyName);

      nextOrder.splice(targetIndex, 0, selectedFiveKeyCard.keyName);

      return {
        ...previous,
        [questionId]: nextOrder,
      };
    });
    setSelectedFiveKeyCard(null);
  };

  const moveToExercise = (index: number) => {
    const topic = exerciseTopics[index];

    if (!topic) return;

    const draft = exerciseDrafts[topic.question_text];

    setExerciseTopicIndex(index);
    setSelectedExercise(topic);
    setGroupInsights(draft?.insights ?? "");
    setImprovementIdeas(draft?.improvements ?? "");
    setNoteStatus("");
    setIsExerciseNoteSaved(savedExerciseTopicTexts.includes(topic.question_text));
    setIsUnsavedExerciseConfirmationOpen(false);
  };

  const startSelectedExercises = () => {
    if (!exerciseTopics[0]) return;

    setIsExerciseReviewScreen(false);
    setIsExerciseEndConfirmationOpen(false);
    setExerciseLimitQuestion("");
    setIsExerciseScreen(true);
    moveToExercise(0);
  };

  const goToNextExercise = () => {
    const nextIndex = exerciseTopicIndex + 1;
    moveToExercise(nextIndex);
  };

  const goToPreviousExercise = () => {
    moveToExercise(exerciseTopicIndex - 1);
  };

  const updateExerciseDraft = (field: "insights" | "improvements", value: string) => {
    if (!selectedExercise) return;

    setExerciseDrafts((previous) => ({
      ...previous,
      [selectedExercise.question_text]: {
        insights: previous[selectedExercise.question_text]?.insights ?? groupInsights,
        improvements: previous[selectedExercise.question_text]?.improvements ?? improvementIdeas,
        [field]: value,
      },
    }));
    setIsExerciseNoteSaved(false);
  };

  const requestNextExercise = () => {
    if (isExerciseNoteSaved) {
      goToNextExercise();
      return;
    }

    setIsUnsavedExerciseConfirmationOpen(true);
  };

  const saveWorkshopNote = async () => {
    if (!selectedExercise) return;

    if (!groupInsights.trim() && !improvementIdeas.trim()) {
      setNoteStatus("気づきまたは改善案を入力してください。");
      return;
    }

    const { error } = await supabase.rpc("save_workshop_note", {
      p_access_code: grantedAccessCode,
      p_category: selectedExercise.category,
      p_question_text: selectedExercise.question_text,
      p_insights: groupInsights.trim(),
      p_improvements: improvementIdeas.trim(),
    });

    if (error) {
      setNoteStatus("記録を保存できませんでした。時間をおいて再度お試しください。");
      return;
    }

    setIsExerciseNoteSaved(true);
    setExerciseDrafts((previous) => ({
      ...previous,
      [selectedExercise.question_text]: {
        insights: groupInsights.trim(),
        improvements: improvementIdeas.trim(),
      },
    }));
    setSavedExerciseTopicTexts((previous) =>
      previous.includes(selectedExercise.question_text)
        ? previous
        : [...previous, selectedExercise.question_text],
    );
    setNoteStatus("グループ記録を保存しました。");
    setExerciseRecords((previous) => {
      const currentRecord = {
        category: selectedExercise.category,
        questionText: selectedExercise.question_text,
        insights: groupInsights.trim(),
        improvements: improvementIdeas.trim(),
      };

      return [
        ...previous.filter((record) => record.questionText !== selectedExercise.question_text),
        currentRecord,
      ];
    });

    if (exerciseTopicIndex === exerciseTopics.length - 1) {
      setIsExerciseReviewScreen(true);
    }
  };

  if (!started && !isResultsRoute) {
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

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold text-slate-700">
              事業種を選択してください
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {serviceTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setServiceType(item)}
                  className={`rounded-xl border px-4 py-3 font-bold ${
                    serviceType === item
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={startSurvey}
            disabled={!serviceType}
            className="mt-8 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800 disabled:bg-slate-300"
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

  if (isResultsRoute && !grantedAccessCode) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
          <h1 className="mt-4 text-3xl font-bold">研修結果を見る</h1>
          <p className="mt-5 leading-7 text-slate-600">
            結果は研修の管理者が公開した場合のみ確認できます。管理者から伝えられた閲覧コードを入力してください。
          </p>

          <label className="mt-8 block text-sm font-semibold text-slate-700">
            閲覧コード
            <input
              type="text"
              value={resultsAccessCode}
              onChange={(event) => setResultsAccessCode(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void loadResultsWithCode();
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              placeholder="例：green-2026"
            />
          </label>

          <button
            type="button"
            onClick={loadResultsWithCode}
            disabled={isLoadingResults}
            className="mt-5 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800 disabled:bg-slate-300"
          >
            {isLoadingResults ? "確認中です..." : "結果を確認する"}
          </button>

          {resultsError && <p className="mt-4 text-sm font-semibold text-red-700">{resultsError}</p>}

          <Link
            href="/"
            className="mt-8 block text-center font-bold text-slate-600 underline"
          >
            アンケート画面へ戻る
          </Link>
        </section>
      </main>
    );
  }

  if (isResultsRoute && isExerciseReviewScreen) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
          <h1 className="mt-4 text-3xl font-bold">演習内容の確認</h1>
          <p className="mt-5 leading-7 text-slate-600">
            今回保存した演習・グループ記録のみを確認できます。
          </p>

          <div className="mt-7 space-y-5">
            {exerciseRecords.map((record, index) => (
              <article key={record.questionText} className="rounded-2xl border border-emerald-200 p-5">
                <p className="text-sm font-semibold text-emerald-700">演習テーマ {index + 1}</p>
                <h2 className="mt-2 text-xl font-bold leading-8">{record.questionText}</h2>
                {record.insights && (
                  <section className="mt-5 rounded-xl bg-emerald-50 p-4">
                    <h3 className="font-bold">グループの気づき</h3>
                    <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{record.insights}</p>
                  </section>
                )}
                {record.improvements && (
                  <section className="mt-4 rounded-xl bg-emerald-50 p-4">
                    <h3 className="font-bold">改善案</h3>
                    <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{record.improvements}</p>
                  </section>
                )}
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsExerciseEndConfirmationOpen(true)}
            className="mt-8 w-full rounded-xl border-2 border-slate-900 bg-white px-5 py-4 font-bold text-slate-700 hover:bg-slate-50"
          >
            終了する
          </button>

          {isExerciseEndConfirmationOpen && (
            <section
              className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"
              role="dialog"
              aria-modal="true"
              aria-labelledby="exercise-end-confirmation-title"
            >
              <h2 id="exercise-end-confirmation-title" className="text-xl font-bold">
                演習を終了しますか？
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                終了すると、この画面から演習内容を確認できなくなります。よろしいですか？
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsExerciseEndConfirmationOpen(false)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 hover:bg-slate-50"
                >
                  戻る
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExerciseEndConfirmationOpen(false);
                    setIsExerciseReviewScreen(false);
                    setIsExerciseScreen(false);
                    setSelectedExercise(null);
                    setExerciseRecords([]);
                    setExerciseDrafts({});
                    setSavedExerciseTopicTexts([]);
                  }}
                  className="flex-1 rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white hover:bg-emerald-800"
                >
                  終了する
                </button>
              </div>
            </section>
          )}
        </section>
      </main>
    );
  }

  if (isResultsRoute && isExerciseScreen && selectedExercise) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
          <h1 className="mt-4 text-3xl font-bold">演習・グループ記録</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            演習テーマ（{exerciseTopicIndex + 1} / {exerciseTopics.length}）
          </p>
          <h2 className="mt-3 text-xl font-bold leading-8">{selectedExercise.question_text}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            個人や利用者を特定できる情報は書かず、グループで話し合った内容を記録してください。
          </p>

          <label className="mt-6 block text-sm font-semibold text-slate-700">
            グループの気づき
            <textarea
              value={groupInsights}
              onChange={(event) => {
                setGroupInsights(event.target.value);
                updateExerciseDraft("insights", event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              rows={5}
              placeholder="例：本人の希望を確認する機会が少ない"
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            改善案
            <textarea
              value={improvementIdeas}
              onChange={(event) => {
                setImprovementIdeas(event.target.value);
                updateExerciseDraft("improvements", event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              rows={5}
              placeholder="例：支援前に本人の希望を確認する時間を設ける"
            />
          </label>

          {noteStatus && <p className="mt-4 text-sm font-semibold text-emerald-700">{noteStatus}</p>}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={saveWorkshopNote}
              className="flex-1 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
            >
              {exerciseTopicIndex === exerciseTopics.length - 1
                ? "保存して提出する"
                : "記録を保存する"}
            </button>
            {exerciseTopicIndex < exerciseTopics.length - 1 && (
              <button
                type="button"
                onClick={requestNextExercise}
                className="rounded-xl border border-emerald-700 px-5 py-4 font-bold text-emerald-700"
              >
                次の項目を演習する
              </button>
            )}
            {exerciseTopicIndex > 0 && (
              <button
                type="button"
                onClick={goToPreviousExercise}
                className="rounded-xl border border-emerald-700 px-5 py-4 font-bold text-emerald-700"
              >
                前の項目に戻る
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setSelectedExercise(null);
                setIsExerciseScreen(false);
              }}
              className="rounded-xl border border-slate-300 px-5 py-4 font-bold text-slate-700"
            >
              結果一覧へ戻る
            </button>
          </div>

          {isUnsavedExerciseConfirmationOpen && (
            <section
              className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5"
              role="dialog"
              aria-modal="true"
              aria-labelledby="unsaved-exercise-title"
            >
              <h2 id="unsaved-exercise-title" className="font-bold text-slate-800">
                記録が保存されていません
              </h2>
              <p className="mt-2 leading-7 text-slate-700">
                このまま演習2へ進むと、入力した記録は保存されません。よろしいですか？
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUnsavedExerciseConfirmationOpen(false)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700"
                >
                  戻る
                </button>
                <button
                  type="button"
                  onClick={goToNextExercise}
                  className="flex-1 rounded-xl bg-amber-700 px-4 py-3 font-bold text-white hover:bg-amber-800"
                >
                  保存せず進む
                </button>
              </div>
            </section>
          )}
        </section>
      </main>
    );
  }

  if (isResultsRoute) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
          <h1 className="mt-4 text-3xl font-bold">結果一覧</h1>
          <p className="mt-5 leading-7 text-slate-600">
            質問ごとの回答傾向を表示しています。個別回答や自由記述は表示されません。
          </p>

          {isLoadingResults && <p className="mt-8 text-slate-600">読み込み中です。</p>}

          {resultsError && <p className="mt-8 text-red-700">{resultsError}</p>}

          {!isLoadingResults && !resultsError && resultRows.length === 0 && (
            <p className="mt-8 text-slate-600">まだ集計できる回答がありません。</p>
          )}

          {!isLoadingResults && !resultsError && topExerciseRows.length > 0 && (
            <section className="mt-8 rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">演習候補</p>
              <h2 className="mt-2 text-xl font-bold">「入る」の回答数が多い上位2項目</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                上位2項目を優先候補として表示しています。他の質問も含め、1〜2項目を選べます。
              </p>
              <div className="mt-4 grid gap-3">
                {topExerciseRows.map((row, index) => {
                  const isSelected = exerciseTopics.some((item) => item.question_text === row.question_text);

                  return (
                    <article
                      key={`top-${row.category}-${row.question_text}`}
                      className={`rounded-xl p-4 shadow-sm ring-1 ${
                        isSelected
                          ? "bg-emerald-100 ring-2 ring-emerald-600"
                          : "bg-white ring-emerald-200"
                      }`}
                    >
                      <span className="text-sm font-semibold text-emerald-700">
                        第{index + 1}候補・入る {Number(row.entered_count)}件
                      </span>
                      <span className="mt-1 block font-bold text-slate-800">{row.question_text}</span>
                      <button
                        type="button"
                        onClick={() => toggleExerciseTopic(row)}
                        className={`mt-4 w-full rounded-xl px-4 py-3 font-bold ${
                          isSelected
                            ? "bg-emerald-700 text-white"
                            : "border border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {isSelected ? "選択済み" : "演習に選ぶ"}
                      </button>
                      {exerciseLimitQuestion === row.question_text && (
                        <p className="mt-3 text-sm font-semibold text-amber-700">
                          演習テーマは2項目まで選べます。
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-8 grid gap-5">
            {resultRows.map((row) => {
              const enteredCount = Number(row.entered_count);
              const notEnteredCount = Number(row.not_entered_count);
              const responseCount = Number(row.response_count);
              const isSelectedForExercise = exerciseTopics.some(
                (item) => item.question_text === row.question_text,
              );
              const questionOptionalTexts = optionalTexts.filter(
                (optionalText) => optionalText.question_text === row.question_text,
              );
              const enteredPercentage =
                responseCount === 0 ? 0 : Math.round((enteredCount / responseCount) * 100);
              const questionId = `${row.question_number}-${row.question_text}`;
              const cardOrder = fiveKeyCardOrders[questionId] ?? fiveKeys.map((key) => key.name);
              const orderedFiveKeys = cardOrder
                .map((keyName) => fiveKeys.find((key) => key.name === keyName))
                .filter((key): key is (typeof fiveKeys)[number] => Boolean(key));

              return (
                <article
                  key={`${row.category}-${row.question_text}`}
                  className={`rounded-2xl border p-5 ${
                    isSelectedForExercise
                      ? "border-2 border-emerald-600 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-emerald-700">{row.category}</p>
                  <h2 className="mt-2 text-lg font-bold">{row.question_text}</h2>
                  <p className="mt-4 text-sm text-slate-600">回答数：{responseCount}件</p>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-emerald-700" style={{ width: `${enteredPercentage}%` }} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    <span className="font-semibold text-emerald-700">入る {enteredCount}件（{enteredPercentage}%）</span>
                    <span className="font-semibold text-slate-600">
                      入らない：{notEnteredCount}件（{100 - enteredPercentage}%）
                    </span>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-slate-700">5Keys傾向</p>
                    {enteredCount === 0 ? (
                      <p className="mt-2 text-sm text-slate-600">「入る」の回答がまだありません。</p>
                    ) : (
                      <>
                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          カードをクリックして選び、移動先のカードをクリックすると順番を動かせます。
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {orderedFiveKeys.map((key) => {
                          const keyCount = Number(row.five_keys?.[key.name] ?? 0);
                          const keyPercentage = Math.round((keyCount / enteredCount) * 100);
                          const isCardSelected =
                            selectedFiveKeyCard?.questionId === questionId &&
                            selectedFiveKeyCard.keyName === key.name;

                          return (
                            <button
                              key={key.name}
                              type="button"
                              onClick={() => moveFiveKeyCard(questionId, key.name)}
                              aria-pressed={isCardSelected}
                              className={`min-h-24 rounded-xl border-2 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${fiveKeyCardStyles[key.name]} ${
                                isCardSelected ? "ring-4 ring-slate-800 ring-offset-2" : ""
                              }`}
                            >
                              <span className="block text-base font-bold text-slate-800">{key.name}</span>
                              <span className="mt-2 block text-sm font-semibold text-slate-700">
                                {keyPercentage}%
                              </span>
                              <span className="mt-1 block text-xs text-slate-600">選択 {keyCount}件</span>
                            </button>
                          );
                        })}
                        </div>
                      </>
                    )}
                  </div>
                  {questionOptionalTexts.length > 0 && (
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-sm font-semibold text-slate-700">関連するエピソード（任意）</p>
                      <div className="mt-3 grid gap-3">
                        {questionOptionalTexts.map((optionalText, index) => (
                          <div
                            key={`${optionalText.input_type}-${index}`}
                            className="rounded-xl bg-emerald-50 p-4"
                          >
                            <p className="whitespace-pre-wrap leading-7 text-slate-700">
                              {optionalText.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleExerciseTopic(row)}
                    className={`mt-5 w-full rounded-xl px-5 py-3 font-bold ${
                      isSelectedForExercise
                        ? "bg-emerald-700 text-white"
                        : "border border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {isSelectedForExercise ? "選択済み" : "演習に選ぶ"}
                  </button>
                  {exerciseLimitQuestion === row.question_text && (
                    <p className="mt-3 text-sm font-semibold text-amber-700">
                      演習テーマは2項目まで選べます。
                    </p>
                  )}
                </article>
              );
            })}
          </div>

          {!isLoadingResults &&
            !resultsError &&
            optionalTexts.some((optionalText) => !optionalText.question_text) && (
            <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-xl font-bold">気になった対応（任意）</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                個人や利用者を特定できる情報が含まれていないか確認し、取扱いにご注意ください。
              </p>
              <div className="mt-4 grid gap-3">
                {optionalTexts
                  .filter((optionalText) => !optionalText.question_text)
                  .map((optionalText, index) => (
                  <article
                    key={`${optionalText.input_type}-${optionalText.question_text ?? "final"}-${index}`}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">
                      {optionalText.content}
                    </p>
                  </article>
                  ))}
              </div>
            </section>
          )}

          {!isLoadingResults && !resultsError && resultRows.length > 0 && (
            <section
              id="exercise-start"
              className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <p className="text-sm leading-6 text-slate-700">
                演習テーマは1〜2項目まで選択できます。上位2項目以外から選んでも問題ありません。
              </p>
              <button
                type="button"
                onClick={startSelectedExercises}
                disabled={exerciseTopics.length === 0}
                className="mt-4 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800 disabled:bg-slate-300"
              >
                選択した{exerciseTopics.length}項目を演習する
              </button>
            </section>
          )}

          {selectedExercise && (
            <section className="mt-8 rounded-2xl border-2 border-emerald-700 p-6">
              <p className="text-sm font-semibold text-emerald-700">
                演習・グループ記録（{exerciseTopicIndex + 1} / {exerciseTopics.length}）
              </p>
              <h2 className="mt-2 text-xl font-bold">{selectedExercise.question_text}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                個人や利用者を特定できる情報は書かず、グループで話し合った内容を記録してください。
              </p>

              <label className="mt-6 block text-sm font-semibold text-slate-700">
                グループの気づき
                <textarea
                  value={groupInsights}
                  onChange={(event) => {
                    setGroupInsights(event.target.value);
                    setIsExerciseNoteSaved(false);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                  rows={4}
                  placeholder="例：本人の希望を確認する機会が少ない"
                />
              </label>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                改善案
                <textarea
                  value={improvementIdeas}
                  onChange={(event) => {
                    setImprovementIdeas(event.target.value);
                    setIsExerciseNoteSaved(false);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
                  rows={4}
                  placeholder="例：支援前に本人の希望を確認する時間を設ける"
                />
              </label>

              {noteStatus && <p className="mt-4 text-sm font-semibold text-emerald-700">{noteStatus}</p>}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={saveWorkshopNote}
                  className="flex-1 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
                >
                  記録を保存する
                </button>
                {exerciseTopicIndex < exerciseTopics.length - 1 && (
                  <button
                    type="button"
                    onClick={requestNextExercise}
                    className="rounded-xl border border-emerald-700 px-5 py-4 font-bold text-emerald-700"
                  >
                    次の項目を演習する
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedExercise(null)}
                  className="rounded-xl border border-slate-300 px-5 py-4 font-bold text-slate-700"
                >
                  演習を閉じる
                </button>
              </div>
            </section>
          )}

          <Link
            href="/"
            className="mt-8 block w-full rounded-xl border border-slate-300 px-5 py-4 text-center font-bold text-slate-700"
          >
            アンケート画面へ戻る
          </Link>
        </section>
      </main>
    );
  }

  if (showFinalSuggestion) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">
            グレーゾーンアンケート
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight">
            最後に、気になった対応を教えてください
          </h1>
          <p className="mt-5 leading-7 text-slate-600">
            現場で気になった対応があれば、一文で入力してください。入力は任意です。
          </p>

          <label className="mt-7 block text-sm font-semibold text-slate-700">
            気になった対応（任意）
            <textarea
              value={fieldSuggestion}
              onChange={(event) => setFieldSuggestion(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"
              rows={4}
              placeholder="例：本人の希望を確認せずに支援を進めてしまった"
            />
          </label>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={() => setShowFinalSuggestion(false)}
              className="rounded-xl border border-slate-300 px-5 py-4 font-bold"
            >
              戻る
            </button>
            <button
              type="button"
              onClick={submitResponse}
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
            >
              {isSubmitting
                ? isEditingSubmittedResponse
                  ? "保存中です..."
                  : "送信中です..."
                : isEditingSubmittedResponse
                  ? "変更を保存する"
                  : "回答を送信する"}
            </button>
          </div>
          {submitMessage && (
            <p className="mt-4 text-sm leading-6 text-slate-600" role="status">
              {submitMessage}
            </p>
          )}
        </section>
      </main>
    );
  }

  if (finished && isReviewingSubmittedAnswers) {
    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">
            グレーゾーンアンケート
          </p>
          <h1 className="mt-4 text-3xl font-bold">自分の回答を確認する</h1>
          <p className="mt-5 leading-7 text-slate-600">
            今回送信した回答内容です。この画面を閉じると、個別の回答は確認できなくなります。
          </p>

          <dl className="mt-7 rounded-xl bg-emerald-50 p-5">
            <dt className="text-sm font-semibold text-slate-600">選択した事業種</dt>
            <dd className="mt-1 text-lg font-bold">{serviceType}</dd>
          </dl>

          <div className="mt-7 space-y-5">
            {surveyQuestions.map((surveyQuestion, index) => (
              <article key={`${surveyQuestion.category}-${surveyQuestion.text}`} className="rounded-xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  {index + 1}. {surveyQuestion.category}
                </p>
                <h2 className="mt-2 font-bold leading-7">{surveyQuestion.text}</h2>
                <p className="mt-4 font-semibold text-emerald-700">
                  回答：{answers[index] ?? "未回答"}
                </p>
                {answers[index] === "入る" && (responseKeys[index] ?? []).length > 0 && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    選んだ観点：{responseKeys[index].join("・")}
                  </p>
                )}
                {episodes[index] && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    エピソード：{episodes[index]}
                  </p>
                )}
              </article>
            ))}
          </div>

          {fieldSuggestion && (
            <section className="mt-7 rounded-xl border border-slate-200 p-5">
              <h2 className="font-bold">気になった対応</h2>
              <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">{fieldSuggestion}</p>
            </section>
          )}

          <button
            type="button"
            onClick={() => {
              setIsReviewingSubmittedAnswers(false);
              setFinished(false);
              setShowFinalSuggestion(false);
              setCurrentQuestion(0);
              setSubmitMessage("");
              setIsEditingSubmittedResponse(true);
            }}
            className="mt-8 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
          >
            回答を編集する
          </button>
          <button
            type="button"
            onClick={() => setIsReviewingSubmittedAnswers(false)}
            className="mt-3 w-full rounded-xl border border-emerald-700 px-5 py-4 font-bold text-emerald-700"
          >
            完了画面に戻る
          </button>
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
            必要に応じて、今回送信した回答を確認できます。
          </p>
          <button
            type="button"
            onClick={() => setIsReviewingSubmittedAnswers(true)}
            className="mt-7 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
          >
            自分の回答を確認する
          </button>
          <button
            type="button"
            onClick={() => setIsEndConfirmationOpen(true)}
            className="mt-3 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white hover:bg-emerald-800"
          >
            回答を終了する
          </button>

          {isEndConfirmationOpen && (
            <section
              className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left"
              role="dialog"
              aria-modal="true"
              aria-labelledby="end-confirmation-title"
            >
              <h2 id="end-confirmation-title" className="font-bold text-slate-800">
                回答を終了しますか？
              </h2>
              <p className="mt-2 leading-7 text-slate-600">
                終了すると、この画面から自分の回答を確認できなくなります。よろしいですか？
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEndConfirmationOpen(false)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700"
                >
                  戻る
                </button>
                <button
                  type="button"
                  onClick={endResponse}
                  className="flex-1 rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white hover:bg-emerald-800"
                >
                  終了する
                </button>
              </div>
            </section>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">
          {currentQuestion + 1} / {surveyQuestions.length}
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
          {["入る", "入らない"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setAnswers((previous) => ({
                  ...previous,
                  [currentQuestion]: item,
                }));

                if (item !== "入る") {
                  setResponseKeys((previous) => ({
                    ...previous,
                    [currentQuestion]: [],
                  }));
                }
              }}
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

        {needsKeys && (
          <fieldset className="mt-7">
            <legend className="text-sm font-semibold text-slate-700">
              気になる観点を選んでください（複数選択可）
            </legend>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              「入る」と感じた理由に近い5Keysを、1つ以上選択してください。
            </p>
            <div className="mt-3 grid gap-3">
              {fiveKeys.map((key) => {
                const isSelected = selectedKeys.includes(key.name);

                return (
                  <button
                    key={key.name}
                    type="button"
                    onClick={() =>
                      setResponseKeys((previous) => ({
                        ...previous,
                        [currentQuestion]: isSelected
                          ? selectedKeys.filter((item) => item !== key.name)
                          : [...selectedKeys, key.name],
                      }))
                    }
                    className={`rounded-xl border px-5 py-4 text-left ${
                      isSelected
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <span className="block font-bold">{key.name}</span>
                    <span className="mt-1 block text-sm">{key.description}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

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
            disabled={!selectedAnswer || (needsKeys && selectedKeys.length === 0)}
            className="flex-1 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white disabled:bg-slate-300"
          >
            {currentQuestion === surveyQuestions.length - 1
              ? "最後に入力へ"
              : "次の設問へ"}
          </button>
        </div>
      </section>
    </main>
  );
}
