// Todo 생성 페이지 (Server Component — 입력 폼만 Client Component).
import Link from "next/link";
import TodoForm from "../../components/TodoForm";
import Button from "../../components/ui/Button";
import { getToday } from "../../lib/date";

export default async function NewTodoPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const selectedDate = params.date ?? getToday();

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-card border border-border bg-surface p-5 shadow-floating sm:p-8">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <h1 className="text-3xl font-black text-text-primary">새 Todo 추가</h1>
          <Link href={`/todos?date=${selectedDate}`}>
            <Button size="sm">← 목록으로</Button>
          </Link>
        </header>
        <TodoForm selectedDate={selectedDate} />
      </section>
    </main>
  );
}
