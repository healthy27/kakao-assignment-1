"use client";

// 개별 Todo 카드 (Client Component — 완료 토글 클릭/키보드, 삭제 인터랙션 필요).
// 토글/삭제는 route.ts 프록시를 거쳐 FastAPI로 전달합니다.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./ui/Button";
import type { Todo } from "../lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export default function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      router.refresh();
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await fetch(`${API_URL}/todos/${todo.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setIsPending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <li
      className="cursor-pointer rounded-card border border-border bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-floating"
      role="button"
      tabIndex={0}
      aria-pressed={todo.completed}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 text-sm font-black transition ${
            todo.completed
              ? "border-success bg-success text-white"
              : "border-border-strong bg-surface text-transparent hover:border-brand"
          }`}
          aria-hidden="true"
        >
          ✓
        </span>

        <div className="min-w-0 flex-1 text-left">
          <p
            className={`break-words text-lg font-bold leading-7 ${
              todo.completed
                ? "text-text-tertiary line-through decoration-2"
                : "text-text-primary"
            }`}
          >
            {todo.text}
          </p>
        </div>

        <div
          className="flex shrink-0 flex-wrap gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <Link href={`/todos/${todo.id}`}>
            <Button size="sm">수정</Button>
          </Link>
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            disabled={isPending}
          >
            삭제
          </Button>
        </div>
      </div>
    </li>
  );
}
