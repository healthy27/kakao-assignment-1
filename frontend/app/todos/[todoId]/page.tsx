// Todo 수정 페이지 (Server Component — 데이터 조회는 서버, 수정 폼만 Client Component).
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo } from "../../actions";
import EditTodoForm from "../../components/EditTodoForm";
import Button from "../../components/ui/Button";

export default async function EditTodoPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const todo = await getTodo(Number(todoId));

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-card border border-border bg-surface p-5 shadow-floating sm:p-8">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <h1 className="text-3xl font-black text-text-primary">Todo 수정</h1>
          <Link href={`/todos?date=${todo.date}`}>
            <Button size="sm">← 목록으로</Button>
          </Link>
        </header>
        <EditTodoForm todo={todo} />
      </section>
    </main>
  );
}
