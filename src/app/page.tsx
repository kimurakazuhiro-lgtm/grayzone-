export default function Home() {
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
          className="mt-8 w-full rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white transition hover:bg-emerald-800"
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