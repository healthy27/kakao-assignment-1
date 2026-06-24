// 서버에서만 실행되는 FastAPI 호출 클라이언트.
// route.ts(프록시)와 actions.ts(서버 액션)가 공유합니다.
// BACKEND_URL은 NEXT_PUBLIC_ 접두사가 없으므로 클라이언트 번들에 포함되지 않습니다.
import "server-only";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export const backend = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
