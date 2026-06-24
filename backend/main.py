"""Todo CRUD API.

2차 과제(React + localStorage)의 Todo 도메인 로직을 서버로 옮긴 백엔드입니다.
데이터 모델은 2차 과제와 동일하게 유지합니다.

    {
      id: int,
      text: str,
      completed: bool,
      date: 'YYYY-MM-DD',
      createdAt: int  # epoch millis
    }

실무에서는 라우터/모델/스키마/DB를 파일로 분리하지만,
이번 과제 가이드에 맞춰 main.py 단일 파일에 모든 로직을 담습니다.
"""

import os
import time

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

# ---------------------------------------------------------------------------
# 환경변수 로드 (.env.local에서 DB 설정 등 민감/환경 의존 값을 분리)
# ---------------------------------------------------------------------------
load_dotenv(".env.local")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")

# CORS 허용 출처. Next.js dev 서버(3000)를 기본 허용합니다.
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS", "http://localhost:3000"
).split(",")

# ---------------------------------------------------------------------------
# DB 설정
# ---------------------------------------------------------------------------
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ---------------------------------------------------------------------------
# DB 모델 (테이블 구조 정의)
# ---------------------------------------------------------------------------
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    # 'YYYY-MM-DD' 형식의 일간 뷰 기준 날짜
    date = Column(String, nullable=False, index=True)
    # epoch millis. 2차 과제의 createdAt과 호환되도록 정수로 저장합니다.
    created_at = Column(Integer, nullable=False)


Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------------------------
# Pydantic 스키마 (요청/응답 데이터 구조 정의)
# ---------------------------------------------------------------------------
class TodoCreate(BaseModel):
    text: str = Field(..., min_length=1)
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")


class TodoUpdate(BaseModel):
    # 부분 수정 허용: 텍스트 수정과 완료 토글을 같은 엔드포인트로 처리합니다.
    text: str | None = Field(default=None, min_length=1)
    completed: bool | None = None


class TodoOut(BaseModel):
    # 프론트(2차 과제)와 동일한 camelCase 키로 응답합니다.
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    completed: bool
    date: str
    createdAt: int = Field(alias="created_at", serialization_alias="createdAt")


# ---------------------------------------------------------------------------
# FastAPI 앱 + 미들웨어
# ---------------------------------------------------------------------------
app = FastAPI(title="Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def now_millis() -> int:
    return int(time.time() * 1000)


def get_todo_or_404(db: Session, todo_id: int) -> Todo:
    todo = db.get(Todo, todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


# ---------------------------------------------------------------------------
# 엔드포인트
# ---------------------------------------------------------------------------
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/todos", response_model=list[TodoOut])
def list_todos(date: str | None = None, db: Session = Depends(get_db)):
    """전체 Todo 목록 조회. date 쿼리로 일간 뷰 필터링도 지원합니다."""
    query = db.query(Todo)
    if date is not None:
        query = query.filter(Todo.date == date)
    # 최신 생성순(2차 과제의 prepend 동작과 동일)
    return query.order_by(Todo.created_at.desc()).all()


@app.post("/todos", response_model=TodoOut, status_code=201)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    todo = Todo(
        text=payload.text.strip(),
        completed=False,
        date=payload.date,
        created_at=now_millis(),
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@app.put("/todos/{todo_id}", response_model=TodoOut)
def update_todo(
    todo_id: int, payload: TodoUpdate, db: Session = Depends(get_db)
):
    todo = get_todo_or_404(db, todo_id)
    if payload.text is not None:
        todo.text = payload.text.strip()
    if payload.completed is not None:
        todo.completed = payload.completed
    db.commit()
    db.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = get_todo_or_404(db, todo_id)
    db.delete(todo)
    db.commit()
