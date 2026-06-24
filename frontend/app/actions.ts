"use server";

// Server Actions: 페이지/컴포넌트에서 직접 import해서 호출하는 서버 함수.
// 데이터 조회(getTodos)는 FastAPI를 직접 호출하고,
// 생성/수정/삭제는 mutation 후 목록 캐시를 무효화(revalidate)합니다.
import { revalidatePath } from "next/cache";
import { backend } from "./lib/backend";
import type { Todo } from "./lib/types";

// 목록 조회: Server Component에서 직접 호출 (route.ts를 거치지 않음)
export async function getTodos(date?: string): Promise<Todo[]> {
  const res = await backend.get<Todo[]>("/todos", {
    params: date ? { date } : undefined,
  });
  return res.data;
}

export async function getTodo(todoId: number): Promise<Todo | null> {
  const todos = await getTodos();
  return todos.find((todo) => todo.id === todoId) ?? null;
}

export async function createTodo(input: {
  text: string;
  date: string;
}): Promise<Todo> {
  const res = await backend.post<Todo>("/todos", input);
  revalidatePath("/todos");
  return res.data;
}

export async function updateTodo(
  todoId: number,
  input: { text?: string; completed?: boolean },
): Promise<Todo> {
  const res = await backend.put<Todo>(`/todos/${todoId}`, input);
  revalidatePath("/todos");
  return res.data;
}

export async function deleteTodo(todoId: number): Promise<void> {
  await backend.delete(`/todos/${todoId}`);
  revalidatePath("/todos");
}
