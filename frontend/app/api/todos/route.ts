// API Route: 클라이언트의 HTTP 요청을 받아 FastAPI로 전달하는 프록시.
// 클라이언트는 FastAPI(8000)를 직접 모르고, 같은 출처(3000)의 /api/todos만 호출합니다.
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { backend } from "../../lib/backend";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  try {
    const res = await backend.get("/todos", {
      params: date ? { date } : undefined,
    });
    return NextResponse.json(res.data);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await backend.post("/todos", body);
    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}

function toErrorResponse(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    return NextResponse.json(error.response.data, {
      status: error.response.status,
    });
  }
  return NextResponse.json(
    { detail: "백엔드 요청에 실패했습니다." },
    { status: 502 },
  );
}
