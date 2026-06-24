// 백엔드(FastAPI)와 공유하는 Todo 데이터 모델.
// 2차 과제의 데이터 구조를 그대로 승계합니다.
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string; // 'YYYY-MM-DD'
  createdAt: number; // epoch millis
};

export type TodoFilter = "all" | "active" | "completed";
