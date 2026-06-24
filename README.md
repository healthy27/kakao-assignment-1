# Assignment 3 - Next.js + FastAPI Todo

2주차 React(Vite) + localStorage Todo 앱을 **Next.js App Router 프론트엔드 +
FastAPI 백엔드** 풀스택 구조로 다시 만든 3주차 과제입니다.
로컬스토리지 기반 상태 관리에서 **서버 API 기반 데이터 흐름**으로 전환했습니다.

## Tech Stack

| Frontend | Backend |
| --- | --- |
| Next.js 16 (App Router) | FastAPI |
| React 19 / TypeScript | Uvicorn |
| Tailwind CSS v4 | SQLAlchemy 2 |
| Axios | SQLite |
| | Pydantic v2 |

## 디렉토리 구조

```txt
kakao-assignment-3/
├── frontend/   # Next.js App Router
├── backend/    # FastAPI 단일 파일 앱
└── docs/
    └── architecture.md   # 구조, 데이터 흐름, 책임 분리
```

자세한 구조와 설계 근거는 [docs/architecture.md](./docs/architecture.md) 참고.

## 실행 방법

두 개의 터미널이 필요합니다.

### 1. 백엔드 (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload          # http://localhost:8000  (docs: /docs)
```

### 2. 프론트엔드 (Next.js)

```bash
cd frontend
npm install
npm run dev                        # http://localhost:3000
```

브라우저에서 `http://localhost:3000` 접속 → `/todos`로 이동합니다.

## 구현한 API

| Method | URL | 설명 |
| --- | --- | --- |
| GET | `/todos` | 전체 Todo 목록 조회 (`?date=`로 일간 필터) |
| POST | `/todos` | 새 Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 (텍스트/완료 부분 수정) |
| DELETE | `/todos/{id}` | Todo 삭제 |

## 데이터 흐름 요약

- **조회**: Server Component → `actions.ts` → FastAPI (직접 호출)
- **변경**: Client Component → `/api/todos` (`route.ts` 프록시) → FastAPI

`route.ts`(프록시)와 `actions.ts`(서버 함수)의 역할 차이, Server/Client
Component 구분 기준은 [architecture.md](./docs/architecture.md)에 정리했습니다.

## 환경변수

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api   # 클라이언트가 호출하는 프록시
BACKEND_URL=http://localhost:8000               # 서버에서만 쓰는 FastAPI 주소

# backend/.env.local
DATABASE_URL=sqlite:///./todos.db
CORS_ORIGINS=http://localhost:3000
```

`NEXT_PUBLIC_` 접두사가 있는 값만 브라우저 번들에 포함됩니다. `BACKEND_URL`은
서버에서만 참조되어 클라이언트에 노출되지 않습니다. `.env.local`은 `.gitignore`에
포함되어 커밋되지 않습니다.

## 2차 과제와 비교

| | 2차 | 3차 |
| --- | --- | --- |
| 데이터 저장 | localStorage | FastAPI + SQLite |
| 데이터 흐름 | `useEffect` 단방향 | 클라이언트-서버 왕복 |
| 렌더링 | 전부 클라이언트 | 기본 서버, 인터랙션만 클라이언트 |
| 라우팅 | 단일 화면 | 파일 기반 라우팅 (목록/생성/수정) |
| 환경변수 | 불필요 | API URL 등 분리 |

승계한 것: 데이터 모델, 날짜/필터 도메인 로직, Toss 톤 디자인 토큰, 공통 UI 컴포넌트.

## 검증

```bash
# frontend
npm run lint     # 통과
npm run build    # 통과 (TypeScript 포함)
```
