# Plan

이 문서는 React Todo 과제를 구현하기 전에 고정해야 하는 목표, 제약, 범위, 검증 기준을 정리합니다. AI에게 바로 구현을 요청하기 전에 이 계획을 먼저 검토시킨다는 전제로 작성했습니다.

## Goal

Vanilla JavaScript Todo 앱을 React Function Component 구조로 마이그레이션합니다.

## Problem Statement

기존 Vanilla JS 방식은 DOM을 직접 찾고 수정하는 흐름에 가깝습니다. 이번 과제에서는 React의 state와 props를 기준으로 UI가 상태 변화에 따라 다시 그려지는 구조를 구현해야 합니다.

## Scope

### In Scope

- Vite 기반 React 프로젝트 구성
- Tailwind CSS v4 설정
- Todo 생성, 조회, 수정, 삭제
- 빈 입력값 제출 시 안내 메시지 표시
- `prompt()` 없는 인라인 수정 UI
- 완료 처리와 완료된 Todo 시각적 구분
- 전체, 진행 중, 완료 필터
- 선택 날짜 기준 일간 Todo 뷰
- localStorage 저장과 새로고침 후 복원
- lint, build 기반 검증
- 최소 CI 구성

### Out of Scope

- React Router
- Redux, Zustand 같은 전역 상태 라이브러리
- 서버 API 연동
- 인증, 사용자 관리
- 도전 미션인 주간 뷰
- Storybook, 시각 회귀 테스트, 배포 자동화

## Constraints

- React, Vite, Tailwind CSS v4, JavaScript를 사용합니다.
- Todo 저장소는 localStorage만 사용합니다.
- Todo 데이터 구조는 문서화된 모델을 기준으로 유지합니다.
- 컴포넌트는 localStorage에 직접 접근하지 않습니다.
- 날짜 계산은 유틸 함수로 분리합니다.
- 필터 값과 storage key는 상수로 관리합니다.
- raw 디자인 값은 Tailwind `@theme` token으로 관리합니다.

## Data Model

```js
{
  id: string,
  text: string,
  completed: boolean,
  date: 'YYYY-MM-DD',
  createdAt: number
}
```

## State Plan

- `todos`: 전체 Todo 목록입니다. `App.jsx`가 소유합니다.
- `filter`: 현재 선택된 필터입니다. `App.jsx`가 소유합니다.
- `selectedDate`: 현재 선택된 날짜입니다. `App.jsx`가 소유합니다.
- `text`: Todo 생성 입력값입니다. `TodoForm.jsx`가 소유합니다.
- `isEditing`, `editText`: 개별 Todo 수정 상태입니다. `TodoItem.jsx`가 소유합니다.

## Component Plan

- `App.jsx`: 상태 소유와 이벤트 핸들러 조립
- `TodoForm.jsx`: Todo 생성 입력과 빈 입력 검증
- `TodoList.jsx`: Todo 목록 렌더링과 빈 상태 표시
- `TodoItem.jsx`: 완료 토글, 인라인 수정, 삭제
- `FilterTabs.jsx`: 필터 선택 UI
- `DateNavigator.jsx`: 날짜 이동 UI
- `Button.jsx`, `Badge.jsx`: 디자인 토큰 기반 공통 UI 조합

## Implementation Order

1. Vite, Tailwind CSS v4 프로젝트 세팅
2. Todo 데이터 모델과 상수 정의
3. localStorage hook 작성
4. Todo 생성과 목록 표시
5. 완료 토글과 삭제
6. 인라인 수정
7. 상태별 필터
8. 일간 날짜 뷰
9. 디자인 토큰과 공통 UI 컴포넌트 정리
10. lint, build, CI 검증
11. 문서와 GitHub Issue 기록

## Acceptance Criteria

- Todo 생성, 조회, 수정, 삭제가 가능해야 합니다.
- 빈 입력값 제출 시 안내 메시지가 표시되어야 합니다.
- 완료된 Todo는 취소선 등으로 구분되어야 합니다.
- Todo 카드 클릭 또는 키보드 조작으로 완료 상태를 변경할 수 있어야 합니다.
- 전체, 진행 중, 완료 필터가 동작해야 합니다.
- 날짜를 이동하면 해당 날짜의 Todo만 표시되어야 합니다.
- 새 Todo는 현재 선택된 날짜로 저장되어야 합니다.
- 새로고침 후에도 Todo 데이터가 유지되어야 합니다.
- `npm run lint`가 통과해야 합니다.
- `npm run build`가 통과해야 합니다.

## AI Review Checklist

AI에게 구현 전후로 아래 질문을 검토시킵니다.

- 과제 필수 범위를 벗어난 기능이 포함되어 있나요?
- 상태 소유권이 불필요하게 분산되어 있나요?
- 컴포넌트가 localStorage나 날짜 계산에 직접 의존하나요?
- raw string, raw color, magic value가 여러 파일에 흩어져 있나요?
- 이벤트 핸들러가 렌더링 중 즉시 실행되는 실수를 포함하나요?
- React state를 직접 mutation하는 코드가 있나요?
- lint와 build로 검증 가능한 구조인가요?

## Validation Plan

```bash
npm run lint
npm run build
```

수동 확인 흐름은 아래 순서로 진행합니다.

1. 빈 입력 제출
2. Todo 생성
3. Todo 수정
4. Todo 완료 처리
5. Todo 삭제
6. 필터 전환
7. 날짜 이동 후 날짜별 Todo 분리 확인
8. 새로고침 후 localStorage 유지 확인
