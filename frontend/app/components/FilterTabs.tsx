"use client";

// 상태 필터 탭 (Client Component — 클릭으로 필터 변경).
// 필터는 URL의 ?filter= 쿼리로 관리합니다.
import { useRouter } from "next/navigation";
import { TODO_FILTER_LABELS, TODO_FILTER_ORDER } from "../lib/constants";
import type { TodoFilter } from "../lib/types";

export default function FilterTabs({
  filter,
  counts,
  selectedDate,
}: {
  filter: TodoFilter;
  counts: Record<TodoFilter, number>;
  selectedDate: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {TODO_FILTER_ORDER.map((value) => {
        const isActive = value === filter;
        return (
          <button
            key={value}
            type="button"
            onClick={() =>
              router.push(`/todos?date=${selectedDate}&filter=${value}`)
            }
            className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-brand/20 ${
              isActive
                ? "bg-brand text-white shadow-card"
                : "bg-surface-alt text-text-secondary hover:bg-surface-blue"
            }`}
          >
            {TODO_FILTER_LABELS[value]}
            <span
              className={`rounded-pill px-2 text-xs ${
                isActive ? "bg-white/20" : "bg-surface text-text-tertiary"
              }`}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
