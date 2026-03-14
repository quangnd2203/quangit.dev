---
description: Quy trình Tech Lead review code và dọn dẹp Tech Debt
---

# 07. Code Review & Refactoring Workflow (Jira-only, @Tech_Lead)

> **Scope:** Làm việc **100% trên Jira** (không dùng docs `management/...` local).  
> **Mục tiêu:** @Tech_Lead review code của @Senior_Dev theo **Jira Description/Design/Links + Jira Subtasks + Confluence links (nếu có) + repo rules**, rồi **PASS/FAIL** rõ ràng theo **task/subtask**.

---

## 🎯 Skills (BẮT BUỘC)
Trước khi review:
- **@Tech_Lead**: `architect`, `code`, `jira-mcp`
- **@Senior_Dev**: `code`, `unit-test`, `jira-mcp`

---

## 🚫 Quy tắc cứng (BẮT BUỘC)

### @Tech_Lead KHÔNG được
- sửa code / refactor / move file / commit / push
- chạy lệnh thay đổi source code

### @Tech_Lead CHỈ được
1) **Đọc**: Jira + Confluence links + repo files (view/grep/list)
2) **Viết**: Review Report (comment trên Jira **hoặc** Confluence page nếu team dùng)
3) **Cập nhật Jira**: comment + transition/label theo workflow

> Mọi thay đổi code → **@Senior_Dev** làm lại theo workflow **/06**.

---

## ✅ INPUT / OUTPUT

### INPUT
- **Case A:** 1 Jira task (không có subtasks) cần review  
- **Case B:** 1 Jira parent task có nhiều subtasks cần review

### OUTPUT (bắt buộc)
- **Review Report** (chọn 1 trong 2):
  - **Option 1 (khuyên dùng):** comment dạng report trên Jira (ưu tiên comment đúng vào subtask/task)
  - **Option 2:** Confluence page “Sprint XX Review Round N” (nếu team dùng Confluence)
- **Trên Jira:** mỗi subtask (và parent nếu có) được đánh dấu **PASS/FAIL**:
  - PASS → comment “Approved by @Tech_Lead …” + transition sang Approved/Done/Ready to Merge (nếu có)
  - FAIL → comment “Rejected …” + transition sang Rework/In Progress (nếu có)

---

## 📌 Thứ tự đọc bắt buộc (Gate)
@Tech_Lead phải đọc đúng thứ tự này và tuân thủ chặt trước khi phán quyết:

1) **Repo rules**:
   - Root `@AGENTS.md`
   - Working-dir `@AGENTS.md`
   - `clean-code-guide.md`
   - các rules/guidelines khác được nhắc trong repo (nếu có)
2) **Jira ticket**:
   - Description (task/subtask)
   - **Jira MCP Data**: Comments, Remote Links, Changelog (sử dụng `jira-mcp` skill).
   - Acceptance Criteria / Expected behavior (nếu có)
   - Design link (Figma) nếu UI
   - Linked docs (Confluence/PRD/Spec/screenshots/notes)
3) Nếu input là **parent task**:
   - đọc parent trước
   - rồi đọc **từng subtask theo thứ tự**, không bỏ qua

> **Nếu thiếu thông tin để review** (vd: UI không có design link, AC mơ hồ) → comment “Needs clarification for review” vào đúng ticket đó và **không approve** ticket đó.

---

# 🔄 WORKFLOW REVIEW (TUẦN TỰ)

## Bước 0 — Setup vòng review
- [ ] Xác định **Task Key** (ABC-123)
- [ ] Xác định loại: **Task nhỏ** hay **Parent + Subtasks**
- [ ] Xác định **Review Round** (Round 1/2/3…)
- [ ] Chọn nơi ghi report: Jira comments (recommended) hoặc Confluence page
- [ ] Vào worktree của task để review code:
  ```bash
  cd <REPO_ROOT>/worktrees/[task-key]
  ```
  > Nếu worktree chưa có: `git fetch origin && git worktree add worktrees/[task-key] feature/[TASK-KEY]`

---

## Bước 1 — Đọc rules của repo (BẮT BUỘC)
- [ ] Read root `@AGENTS.md`
- [ ] Read working-dir `@AGENTS.md`
- [ ] Read `clean-code-guide.md`
- [ ] Read các rule được nhắc trong Jira/Confluence/repo (nếu có)

---

## Bước 2 — Đọc Jira ticket(s) (BẮT BUỘC)

### Case A — Task nhỏ (no subtasks)
- [ ] Read Task Description + AC (nếu có)
- [ ] Use `jira-mcp` to fetch Comments & Remote Links
- [ ] Read Design link (nếu UI)
- [ ] Read Linked docs/notes
- [ ] Nếu thiếu/không rõ → comment “Needs clarification for review …” và dừng phán quyết

### Case B — Parent task có subtasks
- [ ] Read Parent Description + AC + Design + Linked docs
- [ ] Review **từng subtask theo thứ tự**:
  - [ ] Subtask #1: read desc + AC + design + links
  - [ ] Subtask #2: ...
  - [ ] ...

> Nguyên tắc: **Subtask fail thì comment ngay vào subtask đó rồi tiếp tục subtask khác**.

---

## Bước 3 — Review code (cho mỗi task/subtask)
> Đối chiếu theo: **Repo rules** + **Jira description/AC/design/links**.

### 3.1 Đúng yêu cầu (Behavior / AC)
- [ ] Implement đúng theo Jira Description/AC?
- [ ] Edge cases được xử lý đúng?
- [ ] Permission/auth đúng (nếu có)?

### 3.2 Đúng scope & tech spec (nếu Jira có)
- [ ] Không scope creep
- [ ] Đúng file/module/pattern ticket yêu cầu
- [ ] Không phá kiến trúc/contract

### 3.3 Clean Architecture / Structure
- [ ] File đặt đúng layer/feature folder theo rules repo
- [ ] Không import ngược dependency
- [ ] Imports sạch (alias, tránh deep relative)
- [ ] UI tách đúng (page/component/hook)

### 3.4 Clean Code / Quality
- [ ] Không `any` vô tội vạ
- [ ] Không code smell nặng (file quá dài, fn quá dài, nested sâu)
- [ ] Naming/typing/error handling chuẩn
- [ ] Không để debug/log rác

### 3.5 Build / Test
- [ ] Build pass (command chuẩn project)
- [ ] Tests pass (nếu ticket yêu cầu / repo có)

### 3.6 UI/Design (nếu UI)
- [ ] Khớp design link
- [ ] Dùng đúng design tokens / design system
- [ ] Hạn chế inline style; chỉ dùng khi truly dynamic

---

## Bước 4 — Comment lỗi đúng chỗ (QUAN TRỌNG)

### Case A — Task nhỏ
- Nếu FAIL:
  - [ ] Comment vào **task**
  - [ ] Ghi rõ: lỗi gì, ở đâu (file/line), vì sao sai (ref: Jira/Rules), cách sửa
  - [ ] Transition task → Rework/In Progress (nếu workflow có)

### Case B — Parent + Subtasks
- Với từng subtask:
  - Nếu FAIL:
    - [ ] Comment vào **subtask đó**
    - [ ] Ghi rõ lỗi + file/line + fix hint
    - [ ] Transition subtask → Rework/In Progress (nếu có)
  - Sau đó **tiếp tục subtask tiếp theo**
- Parent chỉ PASS khi **tất cả subtasks PASS**

---

## Bước 5 — Phán quyết (PASS/FAIL) + Jira update

### PASS (Approve)
- [ ] Comment: "Approved by @Tech_Lead — Round N" (dùng Template 4)
- [ ] Gắn link PR (nếu có) + note đã đối chiếu rules/AC/design
- [ ] Transition ticket → Approved/Done/Ready to Merge (tuỳ workflow)

### FAIL (Reject)
- [ ] Comment: "Rejected by @Tech_Lead — Round N" (dùng Template 2)
- [ ] Nêu issues theo severity + fix checklist
- [ ] Transition ticket → Rework/In Progress (tuỳ workflow)
- [ ] @Senior_Dev quay lại workflow **/06** để fix + resubmit

> ⚠️ **BẮT BUỘC sau PASS lẫn FAIL:** Tiếp tục sang **Bước 6** để kiểm tra và ghi nhận Tech Debt. Không được bỏ qua dù ticket PASS hay FAIL.

---

## Bước 6 — Refactoring / Tech Debt (Epic: **Tech Debt & Code Quality**)

### 6.1 Mục tiêu
Tách 2 loại vấn đề:
- **Fix-now (Blocker)**: ảnh hưởng correctness/security/architecture → **FAIL và fix ngay**
- **Tech-debt (Non-blocking)**: không ảnh hưởng correctness/security → **không block approve**, nhưng **bắt buộc ghi nợ**

### 6.2 Quy tắc phân loại (BẮT BUỘC)

#### A) Fix-now → FAIL ngay
Bất kỳ điều nào sau đây → ticket/subtask phải FAIL:
- Sai Acceptance Criteria / sai behavior / edge case fail
- Security/permission/auth sai hoặc thiếu
- Vi phạm kiến trúc nghiêm trọng (dependency rule/layer bypass)
- Build/test fail (khi yêu cầu)
- Breaking change ảnh hưởng module khác

#### B) Tech-debt → không block approve
Chỉ được xếp Tech Debt khi:
- Feature đúng AC/behavior
- Không rủi ro security/permission
- Refactor ngoài scope hoặc >30 phút hoặc dễ gây dây chuyền

### 6.3 Fix trong ticket hiện tại hay tạo Tech Debt?
- **Fix trong ticket hiện tại** (Dev sửa ngay) nếu: nhỏ, chắc chắn, không đổi behavior, ≤ 30 phút
- **Tạo Tech Debt ticket** nếu: >30 phút / refactor lớn / đụng nhiều module / cần thêm test đáng kể

### 6.4 Tạo Tech Debt ticket (BẮT BUỘC)

> 🔑 **Epic cố định:** Epic "Tech Debt & Code Quality" = **SCRUM-102**. Không cần tìm lại — link thẳng vào SCRUM-102.

- **Epic link:** Khi tạo ticket, bắt buộc truyền `additional_fields = {"parent": "SCRUM-102"}` HOẶC sau khi tạo dùng `jira_link_to_epic(issue_key=<NEW>, epic_key="SCRUM-102")`.
- **Type:** `Task`
- **Labels:** `tech-debt`, `code-quality`, `from-review`
- **Link back** tới ticket/subtask nguồn: dùng `jira_create_issue_link` với link type `Relates to`

Ticket phải có:
- Context (from review ticket nào)
- Problem (hiện trạng)
- Fix direction (hướng sửa)
- DoD (checklist 2–5 items)

**Sau khi tạo:** Dùng Template 3 để note vào comment của ticket gốc.

---

## Bước 7 — Summary cuối vòng review
- [ ] Approved: X
- [ ] Rejected: Y (top reasons)
- [ ] Tech debt tickets created: Z

---

# 🧩 TEMPLATE (BẮT BUỘC) — để AI làm đúng

## 1) Template “Needs clarification for review”
```md
Needs clarification before approval (Review Round N):

- Missing/unclear point: ...
- What I need: ...
- Impact: cannot verify implementation against AC/design/rules until clarified.
```

## 2) Template “REJECTED” (comment vào đúng task/subtask)
```md
[REJECTED by @Tech_Lead — DD/MM/YYYY — Round N]

Severity: 🔴 CRITICAL / 🟠 HIGH / 🟡 MEDIUM

- Issue: ...
- Where: `path/file.ts` Lx–Ly
- Reference: (Jira AC/Description/Design link / Repo rule)
- Why it is wrong: ...
- Fix hint (actionable):
  1) ...
  2) ...

Fix checklist for @Senior_Dev:
- [ ] ...
- [ ] ...
```

## 3) Template “TECH-DEBT noted” (non-blocking)
```md
Tech-debt noted (non-blocking) — Round N

- Item: ...
- Where: `path/file.ts` Lx–Ly
- Why: maintainability/code-quality (AC still passes)
- Action: Created Tech Debt ticket and linked to Epic "Tech Debt & Code Quality"
- Link: TECHDEBT-XXX
```

## 4) Template “APPROVED”
```md
[APPROVED by @Tech_Lead — DD/MM/YYYY — Round N]

Verified against:
- Repo rules: root/working `@AGENTS.md`, `clean-code-guide.md`, linked rules
- Jira: Description/AC/Design/Linked docs
- Build/Tests: (notes)

Tech Debt:
- (none) / SCRUM-XXX: <mô tả ngắn> — linked to Epic SCRUM-102

Notes:
- PR: <link>
- Risks/Follow-ups (if any): ...
```

## 5) Template Review Summary (đăng ở parent task hoặc 1 comment tổng)
```md
Review Summary — Round N

- Reviewed: X ticket(s)
- Approved: A
- Rejected: R
- Main reject reasons:
  - ...
- Tech debt created and linked to Epic "Tech Debt & Code Quality":
  - TECHDEBT-XXX: ...
```