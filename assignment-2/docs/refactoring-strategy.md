# Refactoring Strategy

이 문서는 구현 후 AI와 함께 어떤 기준으로 코드를 다시 검토하고 개선할지 정리합니다. 목표는 기능을 바꾸지 않고 구조, 가독성, 유지보수성을 높이는 것입니다.

## Refactoring Goals

- 과제 필수 기능의 동작은 유지합니다.
- 컴포넌트 책임을 명확히 합니다.
- 중복된 디자인 값과 문자열을 줄입니다.
- React state update가 예측 가능하게 동작하도록 유지합니다.
- AI가 생성한 코드라도 lint, build, 수동 시나리오로 검증합니다.

## Non-goals

- 기능 추가
- 주간 뷰 구현
- 상태 관리 라이브러리 도입
- Router 도입
- 서버 API 계층 생성
- 과한 추상화 또는 디자인 시스템 패키지화

## Review Axes

### 1. Scope Control

리팩터링 과정에서 과제 필수 범위를 벗어나는 기능이 들어가지 않는지 확인합니다.

확인 질문:

- 주간 뷰 같은 도전 미션이 섞였나요?
- 제출에 필요 없는 라이브러리를 추가했나요?
- 기능 변경 없이 구조 개선만 했나요?

### 2. State Ownership

상태는 가장 가까운 필요한 위치에 둡니다.

현재 기준:

- 전체 Todo, 필터, 선택 날짜는 `App.jsx`
- 생성 입력값은 `TodoForm.jsx`
- 수정 상태는 `TodoItem.jsx`
- 저장 side effect는 `useLocalStorage.js`

확인 질문:

- 하위 컴포넌트가 상위 상태를 직접 수정하려 하나요?
- localStorage 접근이 UI 컴포넌트 안으로 새어 나왔나요?
- 불필요하게 전역 상태가 필요한 구조가 되었나요?

### 3. Data Consistency

Todo 데이터 구조를 한 기준으로 유지합니다.

```js
{
  id: string,
  text: string,
  completed: boolean,
  date: 'YYYY-MM-DD',
  createdAt: number
}
```

확인 질문:

- Todo 객체 생성 방식이 여러 곳에 흩어져 있나요?
- `date` 포맷이 여러 형태로 섞였나요?
- localStorage에서 잘못된 데이터가 들어왔을 때 방어가 필요한가요?

### 4. Design Token SSOT

시각 값은 Tailwind `@theme` token을 기준으로 관리합니다.

확인 질문:

- JSX에 raw hex 값이 들어갔나요?
- 같은 버튼 스타일이 여러 컴포넌트에 반복되나요?
- 색상 이름이 역할이 아닌 색상 자체에만 묶여 있나요?

현재 기준:

- 색상, radius, shadow는 `index.css`의 `@theme`
- 버튼 조합은 `components/ui/Button.jsx`
- 배지 조합은 `components/ui/Badge.jsx`

### 5. Accessibility and UX

기능만 동작하는 것이 아니라 사용자가 자연스럽게 조작할 수 있어야 합니다.

확인 질문:

- 클릭 가능한 영역이 충분히 넓은가요?
- 키보드로 주요 조작이 가능한가요?
- 수정/삭제 버튼을 눌렀을 때 의도치 않은 완료 토글이 발생하나요?
- 빈 상태와 오류 메시지가 사용자에게 명확한가요?

### 6. React Correctness

React 상태 업데이트와 렌더링 흐름이 안전한지 확인합니다.

확인 질문:

- 배열이나 객체를 직접 mutation하고 있나요?
- `map`, `filter`로 새 참조를 만들어 상태를 업데이트하나요?
- 이벤트 핸들러가 렌더링 중 즉시 실행되지 않나요?
- closure가 stale state 문제를 만들 가능성이 있나요?
- 필요한 경우 functional update를 사용했나요?

## AI Refactoring Prompt Template

아래 형식으로 AI에게 리팩터링 검토를 요청합니다.

```md
다음 문서를 기준으로 현재 코드를 리뷰해줘.

[목표]
- 기능 변경 없이 구조와 가독성을 개선한다.

[제약]
- 과제 필수 범위를 넘지 않는다.
- Router, 전역 상태 라이브러리, 서버 API 계층은 추가하지 않는다.
- localStorage 접근은 useLocalStorage에 둔다.
- 디자인 값은 @theme token을 사용한다.

[검토 기준]
- 상태 소유권
- 컴포넌트 책임
- 중복 제거
- React state update 안전성
- 접근성
- lint/build 통과 가능성

[요청]
1. 실제 문제가 되는 부분만 지적해줘.
2. 과한 추상화는 제안하지 마.
3. 수정 우선순위를 높음/중간/낮음으로 나눠줘.
```

## Refactoring Log

### 1. Vite 예제 코드 제거

- Vite 기본 화면, 예제 asset, 불필요한 CSS를 제거했습니다.
- 과제 Todo 앱 코드만 남겨 제출 범위를 명확히 했습니다.

### 2. localStorage hook 분리

- 저장 로직을 CRUD 함수마다 직접 호출하지 않고 `useLocalStorage`로 분리했습니다.
- `todos` 변경 시 `useEffect`가 자동 저장을 담당합니다.

### 3. 디자인 토큰 도입

- raw hex, arbitrary radius, arbitrary shadow를 JSX에서 제거했습니다.
- Toss 느낌의 semantic token을 `index.css`의 `@theme`에 정의했습니다.
- `Button`, `Badge` 공통 UI 컴포넌트를 추가했습니다.

### 4. Todo 카드 전체 클릭 UX 개선

- 체크 버튼만 누르는 방식에서 카드 전체 클릭 방식으로 개선했습니다.
- `Enter`, `Space` 키 조작을 지원했습니다.
- 수정/삭제 버튼은 이벤트 전파를 막아 의도치 않은 완료 토글을 방지했습니다.

## Validation Checklist

리팩터링 후 항상 아래를 확인합니다.

```bash
npm run lint
npm run build
```

수동 검증:

- 생성, 수정, 완료, 삭제 흐름
- 필터 전환
- 날짜 이동
- 새로고침 후 데이터 유지
- 카드 클릭과 키보드 토글
- 수정/삭제 버튼 클릭 시 완료 상태가 바뀌지 않는지 확인
