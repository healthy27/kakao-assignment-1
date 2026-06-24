# Architecture

이 문서는 3주차 Next.js + FastAPI Todo 과제의 구조와 설계 기준을 정리합니다.
2주차(React + localStorage) 과제의 설계 원칙(상태 소유권, 의존성 격리, SSOT,
디자인 토큰)을 풀스택 구조로 승계하고 확장했습니다.

## Project Boundary

App Router 기반 Next.js 프론트엔드와 FastAPI 백엔드가 완전히 분리된 구조입니다.
프론트는 `app/` 안의 파일 구조가 URL이 되고, `route.ts`가 백엔드 프록시 역할을 합니다.
백엔드는 과제 범위에 맞춰 `main.py` 단일 파일에 모든 로직을 담습니다.

```txt
kakao-assignment-3/
├── frontend/
│   ├── app/
│   │   ├── api/todos/
│   │   │   ├── route.ts            # API Route (목록/생성 프록시)
│   │   │   └── [todoId]/route.ts   # API Route (수정/삭제 프록시)
│   │   ├── todos/
│   │   │   ├── [todoId]/page.tsx   # Todo 수정 페이지
│   │   │   ├── new/page.tsx        # Todo 생성 페이지
│   │   │   ├── error.tsx           # 에러 화면
│   │   │   ├── loading.tsx         # 로딩 화면
│   │   │   └── page.tsx            # Todo 목록 페이지
│   │   ├── components/             # UI 컴포넌트 (Server/Client 구분)
│   │   ├── lib/                    # types, constants, date, backend client
│   │   ├── actions.ts             # Server Actions (CRUD 로직)
│   │   ├── globals.css            # Tailwind import + 디자인 토큰
│   │   ├── layout.tsx
│   │   └── page.tsx               # 루트 → /todos 리디렉트
│   └── .env.local
└── backend/
    ├── main.py                    # FastAPI 앱 + 모든 로직
    ├── requirements.txt
    └── .env.local
```

## 2차 과제 기능의 프론트/백엔드 분리

> 시작 전 생각해보기: 2차에서 프론트가 하던 일 중 무엇이 백엔드로 넘어가야 하는가?

| 기능 | 2차 (React + localStorage) | 3차 (Next.js + FastAPI) |
| --- | --- | --- |
| 데이터 저장소 | 브라우저 localStorage | FastAPI + SQLite (서버) |
| Todo CRUD | 프론트 상태 mutation | **백엔드** API (`/todos`) |
| 데이터 영속성 | `useLocalStorage` 훅 | **백엔드** SQLAlchemy |
| 데이터 조회 | 프론트 메모리 | **백엔드** → Server Component |
| 상태별 필터 | 프론트 (파생 상태) | **프론트** (URL 쿼리 기반 파생) |
| 일간 날짜 뷰 | 프론트 필터 | **프론트** URL + 백엔드 date 쿼리 |
| 입력 검증 | 프론트 | **양쪽** (프론트 UX + 백엔드 Pydantic) |
| 디자인 토큰/UI | 프론트 | **프론트** (그대로 승계) |

핵심: **데이터의 소유권이 브라우저에서 서버로 이동**했습니다.
프론트는 더 이상 데이터를 보관하지 않고, API를 통해 서버 데이터를 읽고 변경합니다.

## Data Flow

두 가지 데이터 경로가 공존하며, 과제 가이드의 역할 분리를 그대로 따릅니다.

```txt
[조회 - 읽기]
Server Component (page.tsx) → actions.ts(getTodos) → FastAPI → SQLite
  서버에서 직접 호출. route.ts를 거치지 않음.

[변경 - 생성/수정/삭제]
Client Component → fetch('/api/todos') → route.ts(프록시) → FastAPI → SQLite
  클라이언트는 같은 출처(3000)만 호출하고, route.ts가 FastAPI(8000)로 전달.
```

### route.ts vs actions.ts

| | route.ts | actions.ts |
| --- | --- | --- |
| 역할 | HTTP 요청을 FastAPI로 전달하는 프록시 | 페이지/컴포넌트가 직접 호출하는 서버 함수 |
| 호출 방식 | `fetch('/api/todos')` | `import { getTodos } from './actions'` |
| 사용 위치 | Client Component의 변경 요청 | Server Component의 데이터 조회 |

### 왜 route.ts(프록시)를 두는가

- 클라이언트가 FastAPI(8000)를 직접 알 필요 없이 같은 출처(3000)만 호출 → CORS·보안 단순화
- `BACKEND_URL`이 클라이언트 번들에 노출되지 않음 (서버에서만 참조)
- 백엔드 주소·인증 등 변경 시 프론트 코드 수정 없이 프록시 계층에서 흡수

## Server / Client Component 구분

| 컴포넌트 | 유형 | 이유 |
| --- | --- | --- |
| `todos/page.tsx` | Server | 데이터 조회·집계, 인터랙션 없음 |
| `todos/[todoId]/page.tsx` | Server | 수정 대상 데이터 서버 조회 |
| `todos/new/page.tsx` | Server | 정적 레이아웃 (폼만 Client) |
| `TodoList`, `Button`, `Badge` | Server | 순수 표현, 상태 없음 |
| `TodoForm`, `EditTodoForm` | Client | 입력 상태·검증·제출 |
| `TodoItem` | Client | 완료 토글·삭제 클릭/키보드 |
| `DateNavigator`, `FilterTabs` | Client | 클릭으로 URL 쿼리 변경 |
| `error.tsx` | Client | error boundary 규약상 필수 |

원칙: **기본은 Server Component, 사용자 인터랙션이 필요한 곳에만 `"use client"`.**

## Data Model

2차 과제 데이터 모델을 그대로 유지합니다.

```ts
{
  id: number,         // 백엔드 자동 증가 (2차는 uuid 문자열이었음)
  text: string,
  completed: boolean,
  date: string,       // 'YYYY-MM-DD'
  createdAt: number   // epoch millis
}
```

백엔드는 snake_case(`created_at`)로 저장하고, 응답에서 camelCase(`createdAt`)로
직렬화해 프론트 모델과 호환합니다.

## State Ownership

- `selectedDate`, `filter`: **URL 쿼리**(`?date=`, `?filter=`)가 SSOT.
  Server Component가 읽고, Client 네비게이션이 변경합니다.
- 입력값·제출 상태: 각 폼 Client Component가 소유.
- Todo 데이터: **서버**가 소유. 프론트는 캐시된 사본을 보고 `router.refresh()`로 갱신.

## Dependency Rules

- 컴포넌트는 FastAPI를 직접 호출하지 않습니다 (route.ts 또는 actions.ts 경유).
- `BACKEND_URL`은 `lib/backend.ts`(`server-only`)에서만 사용합니다.
- 날짜 계산은 `lib/date.ts`, 필터 값은 `lib/constants.ts`가 SSOT입니다.
- 디자인 값은 `globals.css`의 `@theme` 토큰을 사용하고 JSX에 raw hex를 쓰지 않습니다.

## Design Principles

- KISS / YAGNI / SRP / SSOT / SOLID (2차 과제 기준 승계)
- 환경 의존 값(`BACKEND_URL`, `DATABASE_URL`)은 환경변수로 분리

## Validation

```bash
# frontend
npm run lint
npm run build

# backend
uvicorn main:app --reload   # localhost:8000/docs 에서 API 확인
```
