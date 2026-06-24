// Todo 목록 렌더링 + 빈 상태 표시 (Server Component — 인터랙션 없음).
import TodoItem from "./TodoItem";
import { TODO_FILTER_LABELS } from "../lib/constants";
import type { Todo, TodoFilter } from "../lib/types";

export default function TodoList({
  todos,
  filter,
}: {
  todos: Todo[];
  filter: TodoFilter;
}) {
  if (todos.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border-strong bg-surface-alt p-10 text-center">
        <p className="text-base font-bold text-text-secondary">
          {filter === "all"
            ? "이 날짜에 등록된 Todo가 없어요."
            : `${TODO_FILTER_LABELS[filter]} 상태의 Todo가 없어요.`}
        </p>
        <p className="mt-2 text-sm text-text-tertiary">
          위 버튼으로 새 Todo를 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
