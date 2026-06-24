# AI Workflow

이 문서는 과제에서 AI를 어떻게 활용했고, 어떤 기준으로 결과를 통제했는지 정리합니다.

## Goal

Vanilla JavaScript Todo 앱을 React Function Component 구조로 마이그레이션합니다.

## Constraints

- React, Vite, Tailwind CSS v4, JavaScript를 사용합니다.
- Todo 데이터는 localStorage에 저장합니다.
- `prompt()`를 사용하지 않고 인라인 수정 UI를 구현합니다.
- 전역 상태 라이브러리와 Router는 사용하지 않습니다.
- 도전 미션인 주간 뷰는 필수 기능 구현 후 별도 판단 대상으로 둡니다.

## Acceptance Criteria

- Todo를 생성, 조회, 수정, 삭제할 수 있습니다.
- 빈 입력값 제출 시 안내 메시지가 표시됩니다.
- 완료 처리된 Todo가 시각적으로 구분됩니다.
- 전체, 진행 중, 완료 필터가 동작합니다.
- 선택한 날짜의 Todo만 표시됩니다.
- 새 Todo는 현재 선택 날짜로 저장됩니다.
- 새로고침 후에도 Todo 데이터가 유지됩니다.
- `npm run lint`와 `npm run build`가 통과합니다.

## AI Usage Process

### 1. Requirement Analysis

과제 명세를 먼저 필수 미션과 도전 미션으로 분리했습니다.

- 필수: CRUD, 인라인 수정, 필터링, 일간 뷰, localStorage
- 도전: 주간 뷰

범위 확장을 막기 위해 주간 뷰는 이번 구현에서 제외했습니다.

### 2. Architecture Planning

구현 전에 기술스택, 폴더 구조, 데이터 모델, 상태 소유권을 먼저 정리했습니다.

- `App.jsx`는 상태 조립자 역할을 담당합니다.
- UI는 `components/`로 분리합니다.
- localStorage 로직은 `hooks/useLocalStorage.js`로 격리합니다.
- 날짜 계산은 `utils/date.js`로 분리합니다.
- 필터 값과 storage key는 `constants/todo.js`에서 관리합니다.

### 3. Implementation Support

AI를 기능 단위 구현 보조에 사용했습니다.

- Todo 생성과 빈 입력 검증
- Todo 인라인 수정
- 완료 처리와 삭제
- 상태별 필터링
- 선택 날짜별 Todo 표시
- localStorage 저장과 복원

### 4. Human Review

AI가 만든 결과를 그대로 신뢰하지 않고 아래 기준으로 검토했습니다.

- 과제 필수 범위를 벗어난 기능이 들어갔는지 확인
- 컴포넌트가 localStorage에 직접 접근하지 않는지 확인
- 필터 문자열이 여러 파일에 흩어져 있지 않은지 확인
- 날짜 계산이 UI 컴포넌트에 섞이지 않았는지 확인
- Vite 예제 코드와 미사용 자산이 남아 있지 않은지 확인
- 색상, radius, shadow 같은 디자인 값이 JSX에 raw 값으로 흩어져 있지 않은지 확인

### 5. Validation

구현 후 아래 검증을 수행했습니다.

```bash
npm run lint
npm run build
```

추가로 GitHub Actions CI를 구성해 push와 pull request에서 동일한 검증이 실행되도록 했습니다.

## Prompting Strategy

AI에게 요청할 때 아래 정보를 함께 제공하는 방식으로 사용했습니다.

- 목표: 무엇을 만들지
- 제약: 어떤 기술과 범위를 지킬지
- 제외 범위: 지금 하지 않을 것
- 검증 기준: 어떤 명령과 동작으로 확인할지
- 설계 원칙: KISS, YAGNI, SRP, SSOT

## Lessons Learned

- AI를 효과적으로 쓰려면 구현 요청 전에 요구사항과 제약을 먼저 고정해야 합니다.
- AI가 제안한 구조도 과제 규모에 비해 과하면 줄여야 합니다.
- 좋은 결과는 프롬프트보다 검증 기준과 리뷰 과정에서 결정됩니다.
- CI를 붙이면 AI가 만든 코드도 재현 가능한 환경에서 검증할 수 있습니다.
- 디자인 값도 token으로 관리하면 AI가 생성한 UI의 일관성을 검토하기 쉬워집니다.
