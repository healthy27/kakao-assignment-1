# Assignment 2 - React Todo

Vanilla JavaScript로 구현한 Todo 앱을 React Function Component 구조로 마이그레이션하는 2주차 과제입니다.

## Tech Stack

- React
- Vite
- Tailwind CSS v4
- JavaScript
- Web Storage API (`localStorage`)

## Scope

이번 구현 범위는 과제의 필수 미션입니다. 도전 미션인 주간 뷰는 범위 확장을 막기 위해 제외했습니다.

### Required

- Todo 생성, 조회, 수정, 삭제
- 빈 입력값 제출 시 안내 메시지 표시
- `prompt()` 대신 인라인 수정 UI 사용
- 전체, 진행 중, 완료 상태 필터링
- 선택 날짜 기준 일간 Todo 보기
- Todo 변경사항 `localStorage` 저장
- 새로고침 후 Todo 데이터 유지

### Optional - Not Implemented

- 주간 날짜 목록 표시
- 이전 주차, 다음 주차 이동
- 날짜별 Todo 개수 표시
- 오늘 날짜 시각적 구분
- 선택 주차 상태 저장

## Todo Data Model

Todo 데이터는 아래 형태를 기준으로 사용합니다.

```js
{
  id: string,
  text: string,
  completed: boolean,
  date: 'YYYY-MM-DD',
  createdAt: number
}
```

## Project Structure

```txt
src/
  components/
    DateNavigator.jsx
    FilterTabs.jsx
    TodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
  constants/
    todo.js
  hooks/
    useLocalStorage.js
  utils/
    date.js
  App.jsx
  main.jsx
  index.css
```

## Documentation

- [Architecture](./docs/architecture.md): 프로젝트 경계, 상태 소유권, 의존성 규칙을 정리합니다.
- [AI Workflow](./docs/ai-workflow.md): AI 활용 방식, 제약 조건, 검증 기준을 정리합니다.

## Design Principles

- KISS: 현재 과제에 필요한 구조만 유지합니다.
- YAGNI: 라우터, 서버 API 계층, 전역 상태 라이브러리는 필요해질 때 도입합니다.
- SRP: 컴포넌트는 하나의 UI 책임을 중심으로 분리합니다.
- SSOT: 필터 값, 날짜 포맷, storage key는 상수와 유틸에서 관리합니다.
- SOLID: 과한 추상화보다 변경 가능성이 높은 책임을 분리하는 데 집중합니다.

## Development

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.
