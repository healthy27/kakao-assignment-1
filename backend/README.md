# Backend - Todo API (FastAPI)

2차 과제에서 localStorage가 하던 데이터 관리를 서버로 옮긴 백엔드입니다.
과제 범위에 맞춰 `main.py` 단일 파일에 라우터·모델·스키마·DB 설정을 담았습니다.

## 실행

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- 서버: http://localhost:8000
- 자동 생성 API 문서: http://localhost:8000/docs

## 구성

| 구분 | 내용 |
| --- | --- |
| DB 모델 | `Todo` (SQLAlchemy, `todos` 테이블) |
| 스키마 | `TodoCreate`, `TodoUpdate`, `TodoOut` (Pydantic v2) |
| DB | SQLite (`todos.db`, 환경변수 `DATABASE_URL`) |
| CORS | `CORS_ORIGINS` (기본 `http://localhost:3000`) |

## 엔드포인트

| Method | URL | 설명 |
| --- | --- | --- |
| GET | `/todos` | 목록 조회 (`?date=YYYY-MM-DD` 일간 필터) |
| POST | `/todos` | 생성 (빈 텍스트는 422) |
| PUT | `/todos/{id}` | 수정 (없으면 404) |
| DELETE | `/todos/{id}` | 삭제 (없으면 404) |

응답은 프론트 모델과 호환되도록 camelCase(`createdAt`)로 직렬화됩니다.

## 환경변수 (`.env.local`)

```bash
DATABASE_URL=sqlite:///./todos.db
CORS_ORIGINS=http://localhost:3000
```
