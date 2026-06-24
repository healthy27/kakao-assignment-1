# Architecture

이 문서는 2주차 React Todo 과제의 구조와 설계 기준을 정리합니다.

## Project Boundary

- 저장소 루트는 GitHub Actions와 과제별 폴더를 관리합니다.
- `assignment-2`는 2주차 React Todo 앱을 담는 독립 프로젝트입니다.
- 앱 실행, 의존성 설치, lint, build는 모두 `assignment-2` 기준으로 수행합니다.

```txt
kakao-assignment-1/
  .github/
    workflows/
      ci.yml
  assignment-2/
    docs/
    src/
    package.json
```

## Source Structure

```txt
src/
  components/
    ui/
      Badge.jsx
      Button.jsx
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

## Responsibilities

- `App.jsx`: Todo 상태, 필터 상태, 선택 날짜 상태를 소유하고 이벤트 핸들러를 조립합니다.
- `components/`: 화면을 구성하는 UI 조각만 담당합니다.
- `constants/todo.js`: Todo 필터 값, 필터 라벨, localStorage key를 관리합니다.
- `hooks/useLocalStorage.js`: localStorage 읽기와 저장 side effect를 캡슐화합니다.
- `utils/date.js`: 날짜 포맷, 날짜 이동, 오늘 여부 판단 같은 순수 날짜 로직을 담당합니다.
- `index.css`: Tailwind CSS v4 import와 전역 기본 스타일만 담당합니다.
- `components/ui/`: 디자인 토큰을 조합한 공통 UI 컴포넌트를 담당합니다.

## Data Model

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

## State Ownership

- `todos`: `App.jsx`가 소유합니다.
- `filter`: `App.jsx`가 소유합니다.
- `selectedDate`: `App.jsx`가 소유합니다.
- `isEditing`: 개별 Todo 수정 UI에만 필요한 상태이므로 `TodoItem.jsx`가 소유합니다.
- 입력값과 입력 오류 메시지: 입력 UI에만 필요한 상태이므로 `TodoForm.jsx`, `TodoItem.jsx`가 각각 소유합니다.

## Dependency Rules

- 컴포넌트는 localStorage에 직접 접근하지 않습니다.
- localStorage 접근은 `useLocalStorage` 훅에서만 처리합니다.
- 날짜 계산은 `utils/date.js`를 통해 처리합니다.
- 필터 문자열과 storage key는 `constants/todo.js`를 기준으로 사용합니다.
- 하위 컴포넌트는 상위 상태를 직접 수정하지 않고 props로 받은 callback을 호출합니다.
- 색상, radius, shadow raw 값은 JSX에 직접 쓰지 않고 Tailwind `@theme` token을 사용합니다.

## Design Tokens

디자인 값은 `src/index.css`의 Tailwind `@theme`에 semantic token으로 정의합니다.

```css
@theme {
  --color-brand: #3182f6;
  --color-text-primary: #191f28;
  --color-surface: #ffffff;
  --color-border: #e5e8eb;
}
```

컴포넌트에서는 raw hex 대신 의미가 있는 utility class만 사용합니다.

```jsx
className="bg-brand text-white"
className="bg-surface text-text-primary border-border"
```

이 방식은 색상 교체, 다크모드 추가, 브랜드 톤 변경 시 수정 범위를 token 정의로 좁히기 위한 선택입니다.

## Design Principles

- KISS: 현재 과제에 필요한 최소 구조만 유지합니다.
- YAGNI: Router, 서버 API 계층, 전역 상태 라이브러리는 도입하지 않습니다.
- SRP: 컴포넌트는 하나의 UI 책임을 기준으로 분리합니다.
- SSOT: 필터 값, 날짜 포맷, storage key를 한 곳에서 관리합니다.
- Design Token SSOT: 시각 값은 `@theme` token을 기준으로 관리합니다.
- SOLID: 과한 추상화보다 변경 가능성이 높은 책임을 분리하는 데 집중합니다.

## Non-goals

이번 구현에서는 아래 항목을 의도적으로 제외했습니다.

- React Router
- Redux, Zustand 같은 전역 상태 라이브러리
- 서버 API 계층
- 도전 미션인 주간 뷰
- E2E 테스트와 배포 자동화

## Validation

기본 검증 기준은 아래 명령입니다.

```bash
npm run lint
npm run build
```

GitHub Actions에서도 동일하게 `npm ci`, `npm run lint`, `npm run build`를 실행합니다.
