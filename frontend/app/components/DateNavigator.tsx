"use client";

// 날짜 이동 UI (Client Component — 클릭으로 선택 날짜 변경).
// 선택 날짜는 URL의 ?date= 쿼리로 관리해 Server Component가 읽도록 합니다.
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { addDays, formatKoreanDate, getToday, isToday } from "../lib/date";

export default function DateNavigator({
  selectedDate,
  filter,
}: {
  selectedDate: string;
  filter: string;
}) {
  const router = useRouter();

  const goTo = (date: string) => {
    router.push(`/todos?date=${date}&filter=${filter}`);
  };

  return (
    <div className="flex flex-col gap-3 rounded-panel bg-surface-alt p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-text-tertiary">선택한 날짜</p>
        <p className="text-lg font-black text-text-primary">
          {formatKoreanDate(selectedDate)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => goTo(addDays(selectedDate, -1))}>
          ← 이전
        </Button>
        <Button
          size="sm"
          variant={isToday(selectedDate) ? "subtle" : "secondary"}
          onClick={() => goTo(getToday())}
        >
          오늘
        </Button>
        <Button size="sm" onClick={() => goTo(addDays(selectedDate, 1))}>
          다음 →
        </Button>
      </div>
    </div>
  );
}
