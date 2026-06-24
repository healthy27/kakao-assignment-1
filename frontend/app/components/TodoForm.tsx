"use client";

// Todo 생성 입력 폼 (Client Component — 입력 상태와 검증, 제출 인터랙션 필요).
// 생성은 route.ts 프록시를 거쳐 FastAPI로 전달합니다 (클라이언트 → /api/todos → FastAPI).
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export default function TodoForm({ selectedDate }: { selectedDate: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setErrorMessage("할 일을 입력한 뒤 추가해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText, date: selectedDate }),
      });
      if (!res.ok) {
        throw new Error("Todo 생성에 실패했습니다.");
      }
      setText("");
      setErrorMessage("");
      // 목록 페이지로 이동하며 서버 데이터 새로고침
      router.push(`/todos?date=${selectedDate}`);
      router.refresh();
    } catch {
      setErrorMessage("Todo 생성 중 문제가 발생했어요. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="rounded-card bg-brand p-4" onSubmit={handleSubmit}>
      <label
        htmlFor="todo-input"
        className="mb-3 block text-sm font-bold text-surface"
      >
        {selectedDate}에 추가할 Todo
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-input"
          type="text"
          className="min-h-12 flex-1 rounded-control border border-transparent bg-surface px-4 text-base font-semibold text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-brand focus:ring-4 focus:ring-brand/20"
          placeholder="예: FastAPI 연동 마무리하기"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setErrorMessage("");
          }}
          autoFocus
        />
        <Button size="lg" type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "추가 중..." : "추가"}
        </Button>
      </div>
      {errorMessage && (
        <p className="mt-3 rounded-control bg-danger-light px-4 py-3 text-sm font-bold text-danger">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
