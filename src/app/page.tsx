"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const allQuestions = [
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

const defaultQuestionIndexes = [0, 1, 9, 10, 17, 18, 25, 26, 32, 33, 41, 42];

function getQuestionsForIndexes(indexes: number[]) {
  return allQuestions.filter((_, index) => indexes.includes(index));
}

const questions = getQuestionsForIndexes(defaultQuestionIndexes);

export const serviceTypes = ["居宅", "入所", "相談", "就労", "放デイ", "児発", "GH"];

type SurveyQuestion = { category: string; text: string };

// 資料「インターンgray」の業種別設問です。どの事業所を選んでも10問表示します。
export const serviceQuestionSets: Record<string, SurveyQuestion[]> = {
  "相談": [
    "本人から就労継続支援 A型を利用したいという希望があったが、作業能力がまだ分からないため、当面は B 型を継続する計画を作成した。",
    "本人がたくさんの選択肢から選ぶことが苦手なため、相談支援専門員が良さそうな事業所を2か所に絞ってから本人に選んでもらった。",
    "本人は一人暮らしを希望しているが、現在の生活状況では難しいと考え、まずグループホームの利用を提案した。",
    "本人が「どこでもいい」と言ったため、支援者が本人に合いそうな事業所を選んだ。",
    "本人の話が長くなり、次の面談予定があったため「続きは次回聞かせてください」と伝えて面談を終了した。",
    "本人が説明を理解することが難しそうだったため、本人への説明より先に家族へ詳しく説明した。",
    "本人がサービス利用について迷っていたので、「私だったらこちらを選びます」と相談支援専門員の意見を伝えた。",
    "本人が「家族には言わないでほしい」と話した内容について、支援に必要だと考え、本人と相談して関係機関への共有方法を考えた。",
    "本人との信頼関係を深めるため、友達のような言葉遣いで話している。",
    "本人が自分で決められるよう、メリットとデメリットを説明してから本人に選んでもらった。",
  ].map((text) => ({ category: "相談支援", text })),
  "居宅": [
    "訪問時間内に終わらせるため、本人が自分でできる家事もヘルパーが行っている。",
    "本人がいつも同じ商品を買うため、確認せずいつもの商品を買ってきた。",
    "本人の好きな商品が安く売っていたので、頼まれていなかったが本人のお金で購入した。",
    "本人が料理をしたいと言ったが、包丁を使うのは危ないと考え、切る作業だけヘルパーが担当した。",
    "本人が外出したいと言ったが、体調が悪そうだったため、今日は家で過ごすことを勧めた。",
    "訪問時間が終わったため、本人がまだ話したそうだったが「続きは次回聞かせてください」と伝えて退出した。",
    "本人が「自分でやりたい」と言った家事について、時間がかかっても見守った。",
    "家族から部屋を片付けてほしいと頼まれたため、本人に確認してから片付けた。",
    "本人が迷っていたため、「私はこっちの方がいいと思う」とヘルパーの意見を伝えた。",
    "本人との信頼関係を作るため、プライベートな話もお互いにしている。",
  ].map((text) => ({ category: "居宅介護・重度訪問介護", text })),
  "GH": [
    "健康のため、カップラーメンは月に 1 回までとしている。",
    "グループホームの自室を何度お願いしても掃除しないため、本人の外出中に職員が掃除した。",
    "本人の好きなお菓子が売っていたので、頼まれてはいなかったが本人のお金で買ってきた。",
    "本人がお金を使いすぎることがあるため、必要な金額だけ職員から本人に渡している。",
    "夜更かしすると翌日の生活に影響するため、23時以降はテレビを消してもらっている。",
    "本人が季節に合わない服を選んだため、「今日はこっちの方がいいと思うよ」と職員が別の服を勧めた。",
    "他の入居者から音がうるさいという苦情があったため、本人と相談して音楽を聴く時間や方法を考えた。",
    "本人が夕食を食べずに外食したいと言ったので、本人のお金や翌日の予定を一緒に確認して外食してもらった。",
    "本人との信頼関係を深めるため、友達のような関係を意識して接している。",
    "本人が自分の部屋に職員が入ってほしくないと言っているため、衛生面が気になっても本人と相談してから入室している。",
  ].map((text) => ({ category: "共同生活援助（グループホーム）", text })),
  "児発": [
    "子どもに成功体験を積んでもらうため、確実にできる課題を用意し、できた時にたくさん褒めている。",
    "活動に参加したくない子どもに、集団参加の経験も必要だと考え「少しだけやってみよう」と促した。",
    "子どもが自分で選ぶと時間がかかるため、職員が2つに絞った中から選んでもらっている。",
    "苦手な食べ物について、経験を増やすため「一口だけ食べてみよう」と勧めた。",
    "他の子どもとのトラブルが続いたため、安心して過ごせるよう別の場所で遊んでもらった。",
    "子どもが「自分でやる」と言ったので、時間がかかっても職員は待った。",
    "子ども本人がやりたがっていたが、職員と一緒に違う遊びをした。",
    "活動の切り替えが難しい子どもに、「みんな待ってるよ」と伝えた。",
    "子どもが好きなことばかり選ぶため、発達のために違う遊びも勧めている。",
    "子どもが嫌だと言った活動について理由を聞き、一緒に別の方法を考えた。",
  ].map((text) => ({ category: "児童発達支援", text })),
  "放デイ": [
    "宿題を終えてから遊ぶことを事業所全体のルールにしている。",
    "本人が宿題をしなかったため、保護者と決めていたルールを適用し、約束していたおやつは無しにした。",
    "本人がゲームをずっと続けるため、事業所ではゲームの時間を30分までとしている。",
    "本人がやりたい活動と他の子どもの希望が重なったため、本人に譲ってもらい、その代わり職員からたくさん褒めた。",
    "他の子どもとのトラブルが多いため、本人は別室で職員と1対1で過ごしている。",
    "送迎時間に間に合わなくなるため、本人がまだ遊びたがっていたが途中で活動を終了した。",
    "本人は集団活動に「参加したくない」と言ったが、集団活動に慣れることを個別支援計画に位置づけているため、参加してもらった。",
    "本人が「家の人には言わないで」と話した内容を、安全面から必要だと判断し、本人には内緒で保護者に伝えた。",
    "本人に自信を持ってもらうため、得意な活動をみんなの前で発表してもらった。",
    "子どもたちに翌月の活動候補を出してもらい、みんなで相談して決めた。",
  ].map((text) => ({ category: "放課後等デイサービス", text })),
  "入所": [
    "本人は毎日入浴したいと希望しているが、人員や設備の都合で決められた曜日に入浴してもらっている。",
    "外出したいという希望があったが、その日は職員配置が難しかったため別の日にしてもらった。",
    "夜間の転倒を防ぐため、本人の同意を得てセンサーを使用している。",
    "本人が朝起きたくないと言ったため、朝食時間について本人と相談した。",
    "全員の生活リズムを整えるため、起床・食事・入浴の時間をある程度統一している。",
  ].map((text) => ({ category: "施設入所支援", text })).concat([
    "初めて利用する人なので、本人より先に家族から生活上の注意点を詳しく聞いた。",
    "家族から「太るから食べさせないで」と言われていたが、本人が希望したので、おやつの時間に少量だけチョコレートを食べてもらった。",
    "普段と違う生活で混乱しないよう、自宅と同じ生活リズムで過ごしてもらった。",
    "本人は夜更かしを希望したが、他の利用者さんの迷惑になるため、消灯後は自室の電気も消してもらった。",
    "初めての利用で安全面が心配だったため、職員の目が届く場所で過ごす時間を多くした。",
  ].map((text) => ({ category: "短期入所", text }))),
  "就労": [
    "本人が自信を持てるよう、確実にできる作業を多めに担当してもらい、できた時には職員が褒めるようにしている。",
    "本人は難しい作業を希望しているが、商品の品質を保つため、現在は簡単な作業を中心に担当してもらっている。",
    "本人が希望する作業と他の利用者さんの希望が重なったため、作業能力が高い人にその仕事を担当してもらった。",
    "作業が遅れていたため、本人に事情を説明して、その日はいつもより少し作業量を増やした。",
  ].map((text) => ({ category: "就労継続支援A型", text })).concat([
    "本人にはスタッフから「できたね」と褒めてもらえる作業を中心にしてもらっている。",
    "本人がやりたい作業と他の人がやりたい作業が重なったため、本人に譲ってもらうよう支援した。",
    "本人が毎日同じ作業を希望するため、経験を増やしてもらおうと曜日によって職員が作業を決めている。",
  ].map((text) => ({ category: "就労継続支援B型", text })), [
    "本人が希望する仕事は現在の能力では難しいと考え、採用される可能性が高そうな仕事を勧めた。",
    "本人が面接で失敗しないよう、本人らしい言葉よりも面接で評価されやすい受け答えを練習した。",
    "本人が希望する職場への応募について、難しいと思いながらもメリットとデメリットを説明して本人に判断してもらった。",
  ].map((text) => ({ category: "就労移行支援", text }))),
};

// 入所と就労は資料内の候補が10問を超えるため、管理者がこの候補から10問を選びます。
export const serviceQuestionBanks: Record<string, SurveyQuestion[]> = {
  ...serviceQuestionSets,
  "入所": serviceQuestionSets["入所"].slice(0, 5).concat([
    "他の利用者さんとのトラブルが続いたため、本人だけ別の場所で過ごす時間を増やした。",
    "本人は薬を自分で管理したいと希望しているが、飲み忘れが続いたため職員管理にした。",
    "本人ができることでも、朝の忙しい時間帯は職員が手伝っている。",
    "本人は違う事業所の日中活動を希望していたが、情報連携を強化するため、入所施設と同じ敷地内の生活介護事業所を利用してもらった。",
    "本人の希望と施設のルールが合わなかったため、なぜそのルールがあるのか説明して一緒に方法を考えた。",
  ].map((text) => ({ category: "施設入所支援", text })), serviceQuestionSets["入所"].slice(5), [
    "他の利用者さんとの相性が心配だったため、最初から居室を離して設定した。",
    "本人が「家に帰りたい」と繰り返し言ったが、家族のレスパイトも必要なため予定どおり宿泊してもらった。",
    "本人が不安そうだったため、その日の予定を写真や言葉で一つずつ説明した。",
    "本人が普段家では禁止されていることを希望したため、家族のルールに合わせた。",
    "本人が自宅へ電話したいと言ったため、希望する時間に電話できるよう支援した。",
  ].map((text) => ({ category: "短期入所", text }))),
  "就労": serviceQuestionSets["就労"].slice(0, 4).concat([
    "過去に週5日勤務すると体調を崩したことがあるため、本人は週5日を希望しているが、まず週3日から始めることにした。",
    "本人が作業に失敗しそうだったため、職員が途中で声をかけ、一緒に作業した。",
    "ミスが続いている本人に対して、「このままだと一般就労は難しい」と伝えた。",
    "本人がもっと難しい仕事をしたいと希望したため、失敗する可能性について説明したうえで挑戦してもらった。",
    "納期を守るため、作業が早い利用者さんには他の人より多くの作業をお願いしている。",
    "本人の得意・不得意を踏まえて、職員と本人で相談しながら担当作業を決めている。",
  ].map((text) => ({ category: "就労継続支援A型", text })), serviceQuestionSets["就労"].slice(4, 7), [
    "本人が「今日は作業したくない」と言ったため、理由を聞いて休憩してもらった。",
    "工賃を上げるため、作業能力の高い利用者さんには多くの仕事を担当してもらっている。",
    "本人が作業中にスマートフォンを何度も見るため、作業時間中は職員が預かるようにしている。",
    "失敗したら商品にならない作業は、職員が代わってしている。",
    "本人の作業スピードが遅くても、本人が希望している作業なので続けてもらっている。",
    "本人さんの作った製品のできていないところを指摘し、やり直してもらった。",
    "本人が何をしたいか分からないと言ったため、職員が本人の得意そうな作業をしてもらった。",
  ].map((text) => ({ category: "就労継続支援B型", text })), serviceQuestionSets["就労"].slice(7), [
    "本人が「障害について企業には詳しく言いたくない」と希望したが、円滑に就労ができるように職員が間に入り、本人の障害特性について企業に説明した。",
    "本人が失敗すると自信を失いそうなので、成功しやすい職場実習を選んだ。",
    "本人が苦手な仕事についても、将来必要になると考えて繰り返し練習してもらっている。",
    "遅刻が続く本人に「会社では通用しないよ」と伝えた。",
    "本人が面接で不利にならないように、面接に着ていく服装を職員が決めた。",
    "本人が疲れたと言ったため、その日の訓練を本人と相談して早めに終了した。",
    "本人の希望だけでなく、「長く働き続けられるか」という視点も含めて就職先を一緒に考えた。",
  ].map((text) => ({ category: "就労移行支援", text }))),
};

// 「2026.09.24 追加分」の候補。元の資料の候補の後ろに表示します。
const additionalServiceQuestionSets: Record<string, SurveyQuestion[]> = {
  "居宅": [
    "本人が来客中も支援を続けてほしいと言ったため、友人がいる前で普段どおり生活上の支援を行った。",
    "本人が家の中では下着姿で過ごしたいと言ったため、そのまま支援を行った。",
    "本人が賞味期限の切れた食品を「まだ食べられる」と言ったため、本人に確認してそのまま残した。",
    "本人から家族への不満を聞いたため、「家族も大変なんだと思うよ」と家族の立場について説明した。",
    "本人がネット通販で高額な商品を購入しようとしていたため、注文する前にもう一度考えるよう声をかけた。",
    "本人が「今日は誰とも話したくない」と言ったため、必要な支援だけを行い、会話を最小限にした。",
    "本人からSNSへの投稿を手伝ってほしいと言われたため、本人が作った文章をそのまま投稿する操作を手伝った。",
    "本人が、職員には不要に見える物を大切に保管していたため、理由を確認し、処分せずそのままにした。",
    "本人から「家族には今日来たことを言わないでほしい」と言われたため、家族には訪問したことを伝えなかった。",
    "本人が趣味の話をゆっくり聞いてほしいと言ったため、予定していた家事の一部を後回しにして、本人の話を聞く時間をとった。",
  ].map((text) => ({ category: "追加分：居宅介護", text })),
  "入所": [
    "本人が他の利用者さんと交際したいと言ったため、トラブルになる可能性を考えて、職員が距離を置くよう勧めた。",
    "本人が施設の食事ではなく、毎日自分で好きな物を買って食べたいと希望したため、食費との二重負担について説明した。",
    "本人が職員に自分のスマートフォンのパスワードを教え、「困った時は見てほしい」と頼んだため、職員間でパスワードを共有した。",
    "本人が他の利用者さんの部屋に遊びに行きたいと言ったため、相手の利用者さんにも確認してから訪室してもらった。",
    "本人が施設内で撮った写真をSNSに投稿したいと言ったため、他の利用者さんが写っていないことを確認して投稿してもらった。",
    "本人が職員への誕生日プレゼントを買ってきたため、本人の気持ちを大切にして受け取った。",
    "本人が施設の行事について「自分も内容を考えたい」と話したため、本人のアイデアを聞き、行事の内容の一部に取り入れた。",
    "本人が他の利用者さんの世話をしたがるため、「本人の役割になる」と考え、簡単な手伝いをお願いしている。",
    "本人が自分の支援記録を見たいと言ったため、本人が傷つきそうな記載は見せず、それ以外の部分を職員と一緒に確認した。",
    "本人が施設のルールについて「利用者も一緒に決めたい」と言ったため、利用者さんも参加する話し合いの場を設けた。",
  ].map((text) => ({ category: "追加分：施設入所支援", text })),
  "相談": [
    "本人から「自分の計画書を全部読みたい」と言われたため、一緒に内容を確認した。",
    "本人が支援者会議で話した内容と、後から相談支援専門員に話した内容が違っていたため、後から聞いた内容を計画書に反映した。",
    "本人が利用している事業所への不満を話したが、関係が悪くなることを心配して、事業所には伝えなかった。",
    "本人が支援者会議に友人を参加させたいと言ったため、本人の希望を確認して参加してもらった。",
    "本人が「今はあまり連絡しなくていい」と話したため、定期的なモニタリングは続けながら、それ以外の電話や連絡の頻度を減らした。",
    "本人が計画の目標を「楽しく暮らしたい」と希望したが、そのままでは具体的ではないと考え、相談支援専門員がより具体的な目標に書き換えた。",
    "本人が現在利用している事業所をとても気に入っていたため、他の選択肢については詳しく説明しなかった。",
    "本人の希望が半年の間に何度も変わったため、過去の計画ではなく、現在の希望をもとに計画を作り直した。",
    "本人が「この内容は記録に残さないでほしい」と話したため、支援に大きな影響がないと判断した内容については記録しなかった。",
    "本人から「相談支援専門員を変えたい」と言われたが、長く関わってきた関係を大切にした方がよいと考え、まず現在の相談支援専門員と話し合うことを勧めた。",
  ].map((text) => ({ category: "追加分：相談支援", text })),
  "放デイ": [
    "本人が自分だけおやつの種類を変えてほしいと言ったため、理由を聞いて別のおやつを用意した。",
    "本人が友達に自分の持ち物をあげたいと言ったため、本人同士が納得していても、一度持ち帰って保護者に確認することにした。",
    "本人が職員をあだ名で呼びたいと言ったため、本人が呼びやすいあだ名で呼んでもらっている。",
    "本人が活動中にイヤホンを使いたいと言ったため、周囲の声が聞こえる範囲で使用してもらった。",
    "本人が友達とのトラブルについて職員には話したが、「相手の子には聞かないでほしい」と希望したため、相手の子には確認せず本人の話だけを聞いた。",
    "本人が自分の作品をSNSに載せたいと言ったため、本人と保護者に確認してから掲載した。",
    "本人が年下の子の手伝いをよくするため、「お兄さん・お姉さんの役割」として手伝ってもらうようにした。",
    "本人が好きな職員にだけ相談したいと言ったため、その職員と話せる時間を作った。",
    "本人が他児から嫌なことを言われた際、「相手も悪気はなかったと思うよ」と説明した。",
    "本人が事業所で決めた活動より、自分で考えた遊びをしたいと言ったため、その日の予定を一部変更した。",
  ].map((text) => ({ category: "追加分：放課後等デイサービス", text })),
  "児発": [
    "子どもが職員の手を握ると安心するため、活動中も必要な時は手を握っている。",
    "子どもが自分の作品を壊そうとしたため、「せっかく作ったから」と職員が止めた。",
    "子どもが同じ絵本を何度も読んでほしいと希望したため、毎回同じ絵本を読んでいる。",
    "子どもが他児のおもちゃを欲しがったため、「貸して」と言えるようになるまで職員が一緒に伝えた。",
    "順番を待つことが難しく、待っている間に活動から離れてしまうため、本人がいつも最初にできるようにしている。",
    "子どもが職員に「嫌い」と言ったため、「そんなこと言ったら悲しいよ」と伝えた。",
    "子どもが自分で決めた順番どおりに遊びたいと言ったため、他の活動に影響しない範囲でその順番を守った。",
    "子どもが失敗して泣いたため、すぐには手伝わず、落ち着いてから本人がどうしたいか確認した。",
    "子どもが保護者の前ではできないことを事業所ではできていたため、その様子を動画で撮って保護者に見てもらった。",
    "子どもが「先生も一緒にやって」と言ったため、職員も子どもと同じ遊びに参加した。",
  ].map((text) => ({ category: "追加分：児童発達支援", text })),
  "GH": [
    "本人が交際相手を自室に泊めたいと希望したため、ホームの生活ルールについて説明した。",
    "本人が毎日自分で夕食を作りたいと言ったため、ホームで用意する食事を断って自炊できるようにした。",
    "本人が他の入居者からよく食べ物をもらっているため、トラブル防止のため利用者同士の食べ物のやり取りを禁止した。",
    "本人が自室に鍵をかけて過ごしたいと言ったため、緊急時の対応方法を本人と確認したうえで認めた。",
    "本人が自室を自分の好きなポスターや飾りでいっぱいにしたいと希望したため、退去時に元に戻せる範囲で自由にしてもらった。",
    "本人が仕事を休んだ日に楽しそうに外出しようとしていたため、「仕事を休んだ日は家で休んだ方がいいのでは」と声をかけた。",
    "本人がホームの食事時間に間に合わなかったため、本人が帰宅するまで食事を取り置いた。",
    "本人が自室に高価な物をたくさん置いているため、盗難が心配なので、一部を職員室で預かることを勧めた。",
    "本人が他の入居者とけんかした後、「もう話したくない」と言ったため、すぐに仲直りを求めず距離を置いてもらった。",
    "本人が休日は一日中部屋でゲームをしたいと言ったため、外出や活動を勧めず、本人の過ごし方に任せた。",
  ].map((text) => ({ category: "追加分：共同生活援助（グループホーム）", text })),
  "就労": [
    "本人が作業手順を自分なりに変えたいと言ったため、完成品に問題がなければ本人の方法で作業してもらった。",
    "本人が職員より他の利用者さんに教えてもらう方が分かりやすいと言ったため、その利用者さんに作業を教えてもらった。",
    "本人が「速さより丁寧さを大切にして仕事をしたい」と希望したため、事業所の生産目標より本人のペースを優先して作業量を調整した。",
    "本人が自分の作った商品を家族にプレゼントしたいと言ったため、販売用の商品なので購入してもらった。",
    "本人が作業中に音楽を聞くと集中できると言ったため、周囲に影響しない範囲でイヤホンの使用を認めた。",
    "本人が自分の作業成績を他の利用者さんと比べたいと言ったため、他の利用者さんの成績は伝えず、本人自身の記録だけを伝えた。",
    "本人は職員から褒められることを嫌がっていたが、自信をつけてもらうため、できた時には職員が積極的に褒めるようにした。",
    "本人が作業を教えてくれた他の利用者さんへ、お礼として飲み物を買いたいと言ったが、利用者間で物を渡すとトラブルになる可能性があるため、職員が断った。",
    "本人が自分の作った商品に「自分で値段を付けてみたい」と希望したため、職員と一緒に商品の価格を考えた。",
    "本人が作業より利用者同士の交流を楽しみに通所していると話したため、作業だけでなく交流できる時間も大切にした。",
  ].map((text) => ({ category: "追加分：就労支援", text })),
};

for (const [service, questions] of Object.entries(additionalServiceQuestionSets)) {
  serviceQuestionBanks[service] = serviceQuestionBanks[service].concat(questions);
}

const fiveKeys = [
  { name: "安全", description: "これは本当に安全か？" },
  { name: "尊厳", description: "これ、自分がされたらどうか？" },
  { name: "ルール", description: "ルールや手順を確認しているか？" },
  { name: "主体", description: "これは誰の意思で決まっているか？" },
  { name: "ワクワク", description: "これは何につながっているか？" },
];

const boardCardStyleByKey: Record<string, string> = {
  未整理: "bg-amber-100",
  安全: "bg-sky-100",
  尊厳: "bg-violet-100",
  ルール: "bg-rose-100",
  主体: "bg-lime-100",
  ワクワク: "bg-orange-100",
};

const defaultQuestionsPerSurvey = questions.length;

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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [surveyQuestions, setSurveyQuestions] = useState(() =>
    [...questions],
  );
  const [workshopSessionName, setWorkshopSessionName] = useState("未設定");
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
  const [resultSessionNames, setResultSessionNames] = useState<string[]>([]);
  const [selectedResultSessionName, setSelectedResultSessionName] = useState("");
  const [boardCardLocations, setBoardCardLocations] = useState<Record<string, string>>({});
  const [selectedBoardCardId, setSelectedBoardCardId] = useState<string | null>(null);
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
    const [{ data: configuredQuestionIndexes }, { data: sessionName }] = await Promise.all([
      supabase.rpc("public_workshop_service_question_indexes"),
      supabase.rpc("public_workshop_session_name"),
    ]);

    const bank = serviceQuestionBanks[serviceType] ?? serviceQuestionSets["相談"];
    const selectedIndexes = typeof configuredQuestionIndexes === "object" && configuredQuestionIndexes !== null
      ? (configuredQuestionIndexes as Record<string, unknown>)[serviceType]
      : null;
    const validIndexes = Array.isArray(selectedIndexes)
      ? selectedIndexes.map(Number).filter((index) => Number.isInteger(index) && index >= 0 && index < bank.length)
      : [];

    // 管理者が事業所ごとに選んだ10問を表示します。未設定時は初期の10問です。
    setSurveyQuestions(
      new Set(validIndexes).size === 10
        ? bank.filter((_, index) => validIndexes.includes(index))
        : serviceQuestionSets[serviceType] ?? serviceQuestionSets["相談"],
    );
    setWorkshopSessionName(typeof sessionName === "string" && sessionName.trim() ? sessionName.trim() : "未設定");
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
      workshopSessionName,
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

  const loadResultsWithCode = async (requestedSessionName?: string) => {
    const accessCode = resultsAccessCode.trim();

    if (!accessCode) {
      setResultsError("管理者から伝えられた閲覧コードを入力してください。");
      return;
    }

    setIsLoadingResults(true);
    setResultsError("");

    const { data: sessionData, error: sessionError } = await supabase.rpc("get_workshop_result_sessions", {
      p_access_code: accessCode,
    });

    if (sessionError) {
      setResultsError("閲覧コードが違うか、結果はまだ公開されていません。");
      setResultRows([]);
      setOptionalTexts([]);
      setGrantedAccessCode("");
      setResultSessionNames([]);
      setSelectedResultSessionName("");
    } else {
      const sessionNames = ((sessionData ?? []) as { session_name: string | null }[])
        .map((session) => String(session.session_name ?? "").trim())
        .filter(Boolean);
      const targetSessionName = (requestedSessionName ?? selectedResultSessionName).trim() || sessionNames[0];

      if (!targetSessionName) {
        setResultsError("表示できる研修結果がありません。");
        setResultRows([]);
        setOptionalTexts([]);
        setGrantedAccessCode("");
        setResultSessionNames([]);
        setSelectedResultSessionName("");
        setIsLoadingResults(false);
        return;
      }

      const { data, error } = await supabase.rpc("get_workshop_results_for_session", {
        p_access_code: accessCode,
        p_session_name: targetSessionName,
      });

      if (error) {
        setResultsError("研修結果を読み込めませんでした。時間をおいて再度お試しください。");
        setResultRows([]);
        setOptionalTexts([]);
        setGrantedAccessCode("");
        setIsLoadingResults(false);
        return;
      }

      setGrantedAccessCode(accessCode);
      setResultSessionNames(sessionNames);
      setSelectedResultSessionName(targetSessionName);
      setResultRows((data ?? []) as ResultRow[]);
      setBoardCardLocations({});
      setSelectedBoardCardId(null);
      setExerciseTopics([]);
      const { data: optionalTextData } = await supabase.rpc("get_workshop_optional_texts_for_session", {
        p_access_code: accessCode,
        p_session_name: targetSessionName,
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

  const moveBoardCard = (keyName: string) => {
    if (!selectedBoardCardId) return;

    setBoardCardLocations((previous) => ({
      ...previous,
      [selectedBoardCardId]: keyName,
    }));
    setSelectedBoardCardId(null);
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
            onClick={() => void loadResultsWithCode()}
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
    const cardsByQuestion = new Map<
      string,
      { id: string; questionText: string; contents: string[]; initialKey: string }
    >(
      resultRows.map((row) => [
        row.question_text,
        {
          id: `question-${row.question_number}`,
          questionText: row.question_text,
          contents: [],
          initialKey: "未整理",
        },
      ]),
    );

    optionalTexts.forEach((optionalText) => {
      if (!optionalText.question_text) return;

      const existingCard = cardsByQuestion.get(optionalText.question_text);
      if (existingCard) {
        existingCard.contents.push(optionalText.content);
      }
    });

    const boardCards = Array.from(cardsByQuestion.values());

    const renderBoardCard = (card: (typeof boardCards)[number]) => {
      const cardLocation = boardCardLocations[card.id] ?? card.initialKey;

      return (
        <button
        key={card.id}
        type="button"
        onClick={() => setSelectedBoardCardId((previous) => (previous === card.id ? null : card.id))}
        aria-pressed={selectedBoardCardId === card.id}
        className={`w-full rounded-lg p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
          boardCardStyleByKey[cardLocation] ?? boardCardStyleByKey.未整理
        } ${selectedBoardCardId === card.id ? "ring-4 ring-slate-800 ring-offset-2" : ""}`}
      >
        <p className="text-xs font-bold text-slate-500">質問</p>
        <p className="mt-1 text-sm font-bold leading-6 text-slate-800">{card.questionText}</p>
        {card.contents.length > 0 ? (
          <>
            <p className="mt-3 border-t border-slate-400/30 pt-3 text-xs font-bold text-slate-600">
              任意入力
            </p>
            <div className="mt-1 space-y-2">
              {card.contents.map((content, contentIndex) => (
                <p key={contentIndex} className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
                  {content}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-3 border-t border-slate-400/30 pt-3 text-xs text-slate-500">任意入力はありません</p>
        )}
        </button>
      );
    };

    return (
      <main className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-800">
        <section className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">グレーゾーンアンケート</p>
          <h1 className="mt-4 text-3xl font-bold">結果一覧</h1>
          <p className="mt-5 leading-7 text-slate-600">
            質問ごとの回答傾向と、回答者が任意で入力した内容を表示しています。
          </p>

          <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <label className="block text-sm font-bold text-slate-700">
              表示する研修結果
              <select
                value={selectedResultSessionName}
                onChange={(event) => void loadResultsWithCode(event.target.value)}
                disabled={isLoadingResults}
                className="mt-2 w-full rounded-lg border border-emerald-200 bg-white p-3 font-normal text-slate-800 disabled:bg-slate-100"
              >
                {resultSessionNames.map((sessionName) => (
                  <option key={sessionName} value={sessionName}>
                    {sessionName}
                  </option>
                ))}
              </select>
            </label>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              過去の研修名を選ぶと、その回の結果だけを表示します。
            </p>
          </section>

          {isLoadingResults && <p className="mt-8 text-slate-600">読み込み中です。</p>}

          {resultsError && <p className="mt-8 text-red-700">{resultsError}</p>}

          {!isLoadingResults && !resultsError && resultRows.length === 0 && (
            <p className="mt-8 text-slate-600">まだ集計できる回答がありません。</p>
          )}

          {!isLoadingResults && !resultsError && resultRows.length > 0 && (
            <section className="mt-8 rounded-2xl border-2 border-slate-800 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">5Keys 共有ボード</p>
              <h2 className="mt-2 text-2xl font-bold">任意入力を、5Keysごとに貼り付ける</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                回答者が選んだ5Keysは表示しません。話し合いの中で、質問と任意入力を読み、カードを5Keysの列へ手動で整理します。
              </p>

              <section className="mt-5 rounded-xl border border-dashed border-slate-400 bg-white p-4">
                <h3 className="font-bold text-slate-800">未整理のカード</h3>
                <p className="mt-1 text-sm text-slate-600">
                  カードをクリックして選んだ後、下の5Keys列にある「ここへ移動」を押してください。
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {boardCards
                    .filter((card) => (boardCardLocations[card.id] ?? card.initialKey) === "未整理")
                    .map(renderBoardCard)}
                </div>
              </section>

              <div className="mt-5 grid gap-4 lg:grid-cols-5">
                {fiveKeys.map((key) => {
                  const cardsForKey = boardCards.filter(
                    (card) => (boardCardLocations[card.id] ?? card.initialKey) === key.name,
                  );

                  return (
                    <section key={key.name} className="min-h-80 rounded-xl border border-slate-300 bg-white p-3">
                      <header className="rounded-lg bg-sky-950 px-3 py-3 text-center text-white">
                        <h3 className="font-bold">{key.name}</h3>
                        <p className="mt-1 text-xs leading-5">{key.description}</p>
                        <button
                          type="button"
                          onClick={() => moveBoardCard(key.name)}
                          disabled={!selectedBoardCardId}
                          className="mt-3 w-full rounded-lg bg-white/15 px-2 py-2 text-xs font-bold hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ここへ移動
                        </button>
                      </header>
                      <div className="mt-3 space-y-3">
                        {cardsForKey.length === 0 ? (
                          <p className="rounded-lg border border-dashed border-slate-200 p-3 text-center text-sm text-slate-500">
                            カードはありません
                          </p>
                        ) : (
                          cardsForKey.map(renderBoardCard)
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>
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
                      <div className="mt-3 space-y-3">
                        {fiveKeys.map((key) => {
                          const keyCount = Number(row.five_keys?.[key.name] ?? 0);
                          const keyPercentage = Math.round((keyCount / enteredCount) * 100);

                          return (
                            <div key={key.name}>
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="font-semibold text-slate-700">{key.name}</span>
                                <span className="font-bold text-slate-600">
                                  {keyPercentage}%（{keyCount}件）
                                </span>
                              </div>
                              <div
                                className="mt-1 h-3 overflow-hidden rounded-full bg-slate-100"
                                role="progressbar"
                                aria-label={`${key.name}の選択割合`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={keyPercentage}
                              >
                                <div
                                  className="h-full rounded-full bg-emerald-700"
                                  style={{ width: `${keyPercentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
