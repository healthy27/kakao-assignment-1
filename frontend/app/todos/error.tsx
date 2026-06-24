"use client";

// 에러 화면 (App Router의 error.tsx 규약 — Client Component 필수).
// 데이터 조회 실패(예: FastAPI 서버 미실행) 시 표시됩니다.
import { useEffect } from "react";
import Button from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-card border border-border bg-surface p-8 text-center shadow-floating">
        <h2 className="text-2xl font-black text-text-primary">
          데이터를 불러오지 못했어요
        </h2>
        <p className="text-sm leading-6 text-text-secondary">
          백엔드(FastAPI) 서버가 실행 중인지 확인해주세요. 잠시 후 다시
          시도하면 정상적으로 동작할 수 있어요.
        </p>
        <Button variant="primary" onClick={reset}>
          다시 시도하기
        </Button>
      </section>
    </main>
  );
}
