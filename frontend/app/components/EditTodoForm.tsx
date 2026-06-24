"use client";

// Todo 수정 폼 (Client Component — 입력 상태/검증/제출 인터랙션 필요).
// 수정은 route.ts 프록시를 거쳐 FastAPI로 전달합니다.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import type { Todo } from "../lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export default function EditTodoForm({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [text, setText] = useState(todo.text);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setErrorMessage("수정할 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText }),
      });
      if (!res.ok) {
        throw new Error("수정에 실패했습니다.");
      }
      router.push(`/todos?date=${todo.date}`);
      router.refresh();
    } catch {
      setErrorMessage("수정 중 문제가 발생했어요. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="edit-input"
          className="mb-2 block text-sm font-bold text-text-secondary"
        >
          할 일 내용
        </label>
        <input
          id="edit-input"
          type="text"
          className="min-h-12 w-full rounded-control border border-border bg-surface px-4 text-base font-semibold text-text-primary outline-none focus:border-brand focus:ring-4 focus:ring-brand/20"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setErrorMessage("");
          }}
          autoFocus
        />
      </div>
      {errorMessage && (
        <p className="rounded-control bg-danger-light px-4 py-3 text-sm font-bold text-danger">
          {errorMessage}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
        <Button type="button" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
