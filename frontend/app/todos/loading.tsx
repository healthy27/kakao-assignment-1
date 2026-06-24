// 목록 데이터 로딩 중 보여줄 화면 (App Router의 loading.tsx 규약).
export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-card border border-border bg-surface p-5 shadow-floating sm:p-8">
        <div className="h-12 w-2/3 animate-pulse rounded-control bg-surface-alt" />
        <div className="h-20 animate-pulse rounded-panel bg-surface-alt" />
        <div className="h-12 animate-pulse rounded-control bg-surface-alt" />
        <div className="flex flex-col gap-3">
          <div className="h-20 animate-pulse rounded-card bg-surface-alt" />
          <div className="h-20 animate-pulse rounded-card bg-surface-alt" />
          <div className="h-20 animate-pulse rounded-card bg-surface-alt" />
        </div>
      </section>
    </main>
  );
}
