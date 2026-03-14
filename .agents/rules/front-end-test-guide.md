---
trigger: glob
globs: /front_end/**
---

# Front-end Test Guide

## 1 Quy tắc bắt buộc

Khi làm task, **phải test theo mức thấp nhất đủ để bắt bug** (test pyramid). BẮT BUỘC theo loại thay đổi:

1. **Đổi domain/application logic** → **Unit tests** bắt buộc.
2. **Đổi UI behavior** → **Component tests** (React Testing Library) bắt buộc.
3. **Đổi integration boundary** (API client, mapping DTO ↔ domain, caching) → **Integration tests** (MSW/mocks) bắt buộc.
4. **Đổi critical user flow** (login, matchmaking, checkout…) → **E2E tests** (Playwright) bắt buộc.

> **Nếu thay đổi chạm nhiều tầng thì cần test tương ứng cho từng tầng.**

Không được merge PR chỉ đổi code mà không có test đi kèm (trừ các ngoại lệ bên dưới).

## 2 Định nghĩa các loại test trong repo này

### 2.1 Unit tests (Domain/Application)
- **Mục tiêu:** Pure function, business rule, calculation, state machine.
- **Vị trí:** `src/domain/**`, `src/application/**`, `src/presentation/**`, `src/shared/**`.
- **Format:** `*.test.ts`.
- **Tooling:** Vitest (`npm run test`).
- **Lưu ý:** Đây là lớp phải test mạnh nhất.

### 2.2 Component tests (UI/Presentation)
- **Mục tiêu:** Render, interaction, state transitions của UI.
- **Vị trí:** `src/presentation/**`.
- **Format:** `*.test.tsx`.
- **Tooling:** Vitest + React Testing Library (combo Next.js khuyên dùng).
- **Lưu ý:** Nếu PR cần component test mà chưa có `@testing-library/react`, PR **phải** bổ sung dependency.

### 2.3 Integration tests (Data/Adapters)
- **Mục tiêu:** API client, mapping DTO ↔ domain, cache logic, socket/Web3 adapters.
- **Format:** `*.test.ts` hoặc `*.test.tsx` (nếu cần render).
- **Tooling:** Vitest + MSW (mock Service Worker) hoặc adapter mocks.
- **Lưu ý:** Nếu backend chưa có, có thể dùng mock server/MSW.

### 2.4 E2E tests (Critical flows)
- **Mục tiêu:** Login, matchmaking, checkout, multi-step flows.
- **Vị trí:** `src/tests/e2e/` (hoặc root `tests/e2e/` nếu dùng Playwright config riêng).
- **Format:** `*.spec.ts` (Playwright convention).
- **Tooling:** Playwright (Next.js hướng dẫn chính thức cho E2E).
- **Lưu ý:** Không cần mỗi PR đều E2E, nhưng mỗi flow quan trọng phải có E2E và PR đụng flow đó phải update.

### 2.5 Đặc biệt: Async Server Components
- **Next.js note:** Vitest hiện không support async Server Components.
- **Quy tắc:** Nếu là async Server Component / routing + server actions phức tạp → ưu tiên **E2E (Playwright)** thay vì unit/component test.

## 2.6 Quy tắc tổ chức thư mục test

Để giữ codebase sạch và dễ bảo trì:

### 2.6.1 Unit/Component/Integration tests
- **Ưu tiên:** Đặt file test **gần module tương ứng** (co-located):
  - `src/domain/board/fen.ts` → `src/domain/board/fen.test.ts`
  - `src/presentation/components/game/Board.tsx` → `src/presentation/components/game/Board.test.tsx`
- **Khi cần nhiều test files cho feature phức tạp:** tạo thư mục `__tests__/` bên cạnh module:
  - `src/domain/board/__tests__/fen.test.ts`
  - `src/presentation/hooks/__tests__/useChessBoard.test.ts`

### 2.6.2 E2E tests
- **Bắt buộc:** Đặt trong thư mục riêng `src/tests/e2e/` theo feature:
  - `src/tests/e2e/auth/login.spec.ts`
  - `src/tests/e2e/game/matchmaking.spec.ts`
  - `src/tests/e2e/tournament/registration.spec.ts`

### 2.6.3 Test utilities & mocks
- **Test helpers:** `src/tests/utils/` (shared test utilities, factories)
- **Mocks:** `src/tests/mocks/` (MSW handlers, mock data)
- **Fixtures:** `src/tests/fixtures/` (test data samples)

## 3 Khi nào phải thêm/cập nhật test?

- **Bắt buộc có test** khi (tương ứng với các tầng ở trên):
  - **Domain/Application logic:** sửa bug, thay đổi business rule, calculation, state machine.
  - **UI behavior:** thêm/sửa interaction, state transitions, validation, disabled states.
  - **Integration boundary:** thay đổi API client, mapping, caching, adapter.
  - **Critical flow:** thay đổi login, matchmaking, checkout, multi-step flows.

- **Được miễn** (nhưng phải ghi rõ lý do trong PR/task) khi:
  - Chỉ đổi copy/text, spacing, hoặc styling thuần (không đổi behavior).
  - Thay đổi config build/lint mà không đụng runtime behavior.
  - Thay đổi file sinh ra tự động (nếu có) và không ảnh hưởng logic.

## 4 Checklist trước khi kết thúc task

- **Test coverage theo thay đổi (test pyramid)**
  - Domain/Application logic đổi => có unit test.
  - UI behavior đổi => có component test (RTL).
  - Integration boundary đổi => có integration test (MSW/mocks).
  - Critical flow đổi => có E2E test (Playwright).

- **Chạy test**
  - `npm run test`

- **Không phá build**
  - `npm run build`

## 5 Quy tắc trình bày trong PR/task

Nếu vì lý do bất khả kháng chưa thể viết test trong task hiện tại, bắt buộc:

- Nêu rõ **lý do cụ thể** (thiếu tooling nào, bị blocker gì).
- Ghi rõ **kế hoạch bổ sung test** (ngày/PR tiếp theo hoặc task id).
- Không được để “TODO test” mơ hồ.
