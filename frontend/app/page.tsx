import { redirect } from "next/navigation";

// 루트 진입 시 Todo 목록 페이지로 이동
export default function Home() {
  redirect("/todos");
}
