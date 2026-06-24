// Todo 목록 페이지 (Server Component).
// 데이터 조회는 서버에서 actions.ts의 getTodos를 직접 호출합니다.
// 인터랙션이 필요한 부분(날짜 이동/필터/카드)만 Client Component로 분리되어 있습니다.
import Link from "next/link";
import { getTodos } from "../actions";
import DateNavigator from "../components/DateNavigator";
import FilterTabs from "../components/FilterTabs";
import TodoList from "../components/TodoList";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { getToday } from "../lib/date";
import type { TodoFilter } from "../lib/types";

function normalizeFilter(value?: string): TodoFilter {
  if (value === "active" || value === "completed") return value;
  return "all";
}

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const selectedDate = params.date ?? getToday();
  const filter = normalizeFilter(params.filter);

  // 선택 날짜의 Todo만 서버에서 조회 (일간 뷰)
  const dailyTodos = await getTodos(selectedDate);

  const counts: Record<TodoFilter, number> = {
    all: dailyTodos.length,
    active: dailyTodos.filter((todo) => !todo.completed).length,
    completed: dailyTodos.filter((todo) => todo.completed).length,
  };

  const visibleTodos = dailyTodos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-card border border-border bg-surface p-5 shadow-floating sm:p-8">
        <header className="flex flex-col gap-3 border-b border-border pb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
                오늘 할 일 정리
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                Next.js와 FastAPI로 데이터를 주고받으며, 날짜별로 Todo를
                관리합니다.
              </p>
            </div>
            <Badge className="self-start md:self-auto" variant="solid">
              {counts.active}개 진행 중
            </Badge>
          </div>
        </header>

        <DateNavigator selectedDate={selectedDate} filter={filter} />

        <Link href={`/todos/new?date=${selectedDate}`}>
          <Button className="w-full" size="lg" variant="primary">
            + 새 Todo 추가하기
          </Button>
        </Link>

        <FilterTabs
          filter={filter}
          counts={counts}
          selectedDate={selectedDate}
        />

        <TodoList todos={visibleTodos} filter={filter} />
      </section>
    </main>
  );
}
