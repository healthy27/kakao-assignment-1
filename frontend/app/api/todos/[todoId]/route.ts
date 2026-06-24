// 개별 Todo에 대한 수정(PUT)/삭제(DELETE) 프록시.
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { backend } from "../../../lib/backend";

type RouteContext = { params: Promise<{ todoId: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { todoId } = await params;
  try {
    const body = await request.json();
    const res = await backend.put(`/todos/${todoId}`, body);
    return NextResponse.json(res.data);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { todoId } = await params;
  try {
    await backend.delete(`/todos/${todoId}`);
    return new NextResponse(null, { status: 204 });
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
