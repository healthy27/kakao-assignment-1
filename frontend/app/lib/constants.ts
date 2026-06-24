import type { TodoFilter } from "./types";

// 필터 값과 라벨의 SSOT (2차 과제 constants/todo.js 승계)
export const TODO_FILTERS: Record<string, TodoFilter> = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const TODO_FILTER_LABELS: Record<TodoFilter, string> = {
  all: "전체",
  active: "진행 중",
  completed: "완료",
};

export const TODO_FILTER_ORDER: TodoFilter[] = ["all", "active", "completed"];
