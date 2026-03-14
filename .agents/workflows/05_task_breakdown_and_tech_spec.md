---
description: Phân tích kỹ thuật backlog/task, tách sub-tasks, viết Tech Spec, và quản lý Sprint Task Board
---

# 🚀 05. Task Breakdown & Tech Spec Workflow (Jira-ready)

---

> [!IMPORTANT]
> **KỸ NĂNG YÊU CẦU (BẮT BUỘC)**
> Các Agent **BẮT BUỘC** phải tải/đọc (`view_file`) file Hướng dẫn Kỹ năng tương ứng từ `.agents/skills/` trước khi làm việc:
> - **@PM / Managing Director**: Nạp skill `plan`, `brainstorm` và `jira-mcp`.
- **@Tech_Lead**: Nạp skill `architect`, `code` và `jira-mcp`.
- **@BA**: Nạp skill `slide`, `persona`, `write` và `jira-mcp`.

---

## 0) Bắt buộc đọc và tuân thủ chặt trước khi làm (theo thứ tự)
1) Root `@AGENTS.md`
2) Working-dir `@AGENTS.md`
3) Jira **Description** (parent/task)
4) **Jira MCP Skill**: Sử dụng `jira-mcp` skill để lấy đầy đủ **Comments** và **Remote Links** (Design/Wiki/Changelog).
5) **Design link** từ Jira/Confluence nếu UI.
6) Nếu có subtasks: **đọc từng subtask** (desc + design) theo thứ tự.
7) `clean-code-guide.md` + docs/rules linked khác.

---

## 🎯 Mục tiêu
Quy trình phối hợp giữa **@BA**, **@Tech_Lead**, và **@PM** nhằm làm rõ một Jira ticket trước khi giao cho Dev triển khai, đảm bảo:
- ✅ **Nghiệp vụ rõ ràng**: Không hiểu sai yêu cầu.
- ✅ **Kỹ thuật thực tế**: Biết chính xác file cần sửa, pattern cần dùng.
- ✅ **Task vừa vặn**: Quyết định giữ nguyên hay phân rã (split) để tối ưu tiến độ.
- ✅ **Jira Sẵn sàng**: Description đầy đủ là "kim chỉ nam" cho Dev.

---

## ⚠️ QUY TẮC BẮT BUỘC

> **INPUT**: Một hoặc nhiều Jira Issue Keys (Story, Task, Bug) từ Backlog hoặc Sprint hiện tại.
> **KHÔNG ÁP DỤNG** cho Epic — Epic dùng workflow Sprint Planning để tách thành Stories.

### 📦 Đầu ra chính (Output)
1. **Jira Parent Ticket**: Cập nhật Description với đầy đủ Business Clarification, Tech Spec, và PM Decision.
2. **Tasks ngang hàng (Story/Feature)**: LUÔN tạo — 1 Task (nhỏ) hoặc nhiều Tasks (lớn).
3. **Subtasks (Task/Bug)**: Chỉ tạo khi >= 5 SP.

### 🚫 Giới hạn hành động
- ✅ **Nên làm**: Đọc Requirements, Design (nếu có) từ **Jira-linked Pages / Confluence** của project.
- ✅ **Nên làm**: Nếu có local mirror trong repo thì dùng để đối chiếu thêm.
- ✅ **Nên làm**: Scan source code, rà soát logic hiện tại.
- ✅ **Nên làm**: Sử dụng `view_file`, `grep_search`, `view_file_outline`.
- ❌ **CẤM TUYỆT ĐỐI**: Viết code logic, chỉnh sửa `.ts`, `.tsx`, `.sql`.
- ❌ **CẤM TUYỆT ĐỐI**: Chạy lệnh terminal hoặc thay đổi business scope mà không có confirm của PM.

---

## 👥 VAI TRÒ & QUY TRÌNH THỰC HIỆN

### 🟦 Giai đoạn 1: Clarify Nghiệp vụ (@BA)
*BA thấu hiểu người dùng và yêu cầu kinh doanh.*

- **Việc cần làm**:
  - Đọc Jira ticket, Requirements, tìm kiếm đầy đủ các file liên quan (nếu task là UI) Design trên Pages / Confluence
  - Xác định Business Goal, User Value và **Acceptance Criteria (AC)**.
  - Phân tách rõ những gì **nằm ngoài phạm vi (Out of Scope)**.
- **Đầu ra**: Soạn block `Business Clarification`.

---

### 🟩 Giai đoạn 2: Phân tích Kỹ thuật (@Tech_Lead)
*Tech Lead rà soát hệ thống và định hướng thực thi.*

- **Việc cần làm**:
  - Scan Source Code để tìm **Impacted Files**.
  - Xác định **Technical Approach** (Pattern, Layer, DTO/Entity).
  - Dự phòng các **Edge Cases** và rủi ro kỹ thuật.
- **Bắt buộc**: Luôn liệt kê chi tiết `Implementation Steps`. Hai bước cuối BẮT BUỘC là "Build Verify" và "Manual Test". *(Với Story, Implementation Steps viết trong Task ngang hàng, không viết trong Story.)*
- **Phân loại theo Issue Type**:

  | Issue Type | Quy tắc phân rã |
  |---|---|
  | **Story / Feature** | **LUÔN** tạo Task ngang hàng. SP nhỏ (< 5) → 1 Task chứa toàn bộ Implementation Steps. SP lớn (>= 5) → tách thành nhiều Tasks, mỗi Task là 1 nhóm steps. Implementation Steps viết trong **Task**, không viết trong Story. |
  | **Task / Bug** | SP < 5 → Atomic (giữ nguyên, Implementation Steps trong Description). SP >= 5 → tách thành Subtasks. |

> [!IMPORTANT]
> **QUY TẮC SP CHO STORY**
> Story **KHÔNG gán SP** trực tiếp. SP chỉ nằm ở các Tasks ngang hàng.
> Tổng SP các Tasks = Story estimate ban đầu.

---

### 🟨 Giai đoạn 3: Chốt quyết định (@PM)
*PM tổng hợp và ra quyết định cuối cùng về việc giao việc.*

- **Việc cần làm**:
  - Review kết quả của BA và Tech Lead.
  - Ra quyết định:
    - **Story/Feature**: `1 Task ngang hàng` hay `Nhiều Tasks ngang hàng`.
    - **Task/Bug**: `Atomic (giữ nguyên)` hay `Split Subtasks`.
  - Xác nhận ticket đã đủ điều kiện để **"Ready for Dev"**.

---

## 📝 TEMPLATES CHUẨN

### Template A — Cho Story / Feature
> [!TIP]
> Luôn append vào cuối Description hiện tại để không làm mất thông tin gốc.
> Story chỉ chứa overview. Implementation Steps chi tiết viết trong Task ngang hàng.
> Luôn append Design Link Page.

```markdown
---
### 🟦 Business Clarification (by @BA)
- **Mục tiêu**: ...
- **Acceptance Criteria**:
  1. [AC 1]
  2. [AC 2]
- **Out of Scope**: ...

### 🟩 Technical Spec (by @Tech_Lead)
- **Impacted Files**:
  - `path/to/file1.ts`
  - `path/to/file2.tsx`
- **Approach**: ...
- **Proposed Tasks**: (Implementation Steps viết trong từng Task khi tạo)
  1. Task 1 — mô tả (X SP)
  2. Task 2 — mô tả (Y SP)

### 🟨 PM Decision Summary
- **Final Decision**: [1 Task ngang hàng / Nhiều Tasks ngang hàng]
- **Total Estimate**: [Tổng SP phân bổ cho các Tasks]
- **Ready for Dev**: [Yes/No]
- **Note**: ...
```

### Template B — Cho Task / Bug
> [!TIP]
> Luôn append vào cuối Description hiện tại để không làm mất thông tin gốc.
> Luôn append Design Link Page.

```markdown
---
### 🟦 Business Clarification (by @BA)
- **Mục tiêu**: ...
- **Acceptance Criteria**:
  1. [AC 1]
  2. [AC 2]
- **Out of Scope**: ...

### 🟩 Technical Spec (by @Tech_Lead)
- **Impacted Files**:
  - `path/to/file1.ts`
  - `path/to/file2.tsx`
- **Approach**: ...
- **Implementation Steps**:
  1. [Step 1]
  2. [Step 2]
  3. Build Verify
  4. Manual Test

### 🟨 PM Decision Summary
- **Final Decision**: [Atomic / Split Subtasks]
- **Story Point Estimate**: [e.g., 2 SP, 5 SP]
- **Ready for Dev**: [Yes/No]
- **Note**: ...
```

---

## 🔄 ĐỒNG BỘ & BÁO CÁO

Cập nhật Jira qua MCP:
- Update Description cho **Parent Ticket**.
- Update **Story Points** (SP): Gán SP cho **Task ngang hàng** (Story) hoặc **ticket gốc** (Task/Bug). Story KHÔNG gán SP.
- Update Design Link Page cho **Parent Ticket**.

### Phân rã công việc — theo Issue Type

#### Story / Feature → LUÔN tạo Task ngang hàng

- **SP nhỏ (< 5)**: Tạo **1 Task** ngang hàng chứa toàn bộ Implementation Steps. SP gán cho Task.
- **SP lớn (>= 5)**: Tạo **nhiều Tasks** ngang hàng, mỗi Task là 1 nhóm Implementation Steps. SP phân bổ cho từng Task.
- **BẮT BUỘC:** Link "Relates" tới Story gốc. Issue Type = "Task".
- **BẮT BUỘC:** Nếu Story thuộc Epic → các Task cũng phải `link_to_epic`.
- **SP:** Story KHÔNG gán SP. SP chỉ nằm ở các Tasks ngang hàng.

#### Task / Bug → Tách Subtask khi >= 5 SP

- **SP nhỏ (< 5)**: Giữ nguyên (Atomic). Implementation Steps trong Description.
- **SP lớn (>= 5)**: Tạo **Subtasks** bằng `create_issue`. Issue Type = "Subtask", `additional_fields: {"parent": "SCRUM-XXX"}`.

#### Quy tắc chung

- Title format: `[Key gốc] Mô tả cụ thể`.
- Mỗi Task/Subtask sinh ra phải có Implementation Steps + "Build Verify" + "Manual Test" ở 2 bước cuối.
- **Build Verify** = `npm run build && npm run lint` pass.
- **Manual Test** = xác nhận kết quả đúng (verify UI, file structure, grep imports... — không nhất thiết phải test UI nếu task không liên quan).

---

## 📌 VÍ DỤ THỰC TẾ

### Ví dụ 1: Story nhỏ (< 5 SP) — Tạo 1 Task ngang hàng

**Input:** `SCRUM-146` (Story — "Migrate front_end to new architecture", thuộc Epic SCRUM-102)

**Kết quả trên Jira:**

| Ticket | Type | SP | Mô tả |
|---|---|---|---|
| SCRUM-146 | Story | *(không gán)* | BA Clarification + Tech Spec overview |
| SCRUM-147 | Task | 3 | `[SCRUM-146] Scaffold infrastructure + domain ports` |

- SCRUM-147 link "Relates" → SCRUM-146
- SCRUM-147 link_to_epic → SCRUM-102
- Implementation Steps + Build Verify + Manual Test viết trong SCRUM-147

---

### Ví dụ 2: Story lớn (>= 5 SP) — Tạo nhiều Tasks ngang hàng

**Input:** `SCRUM-200` (Story — "Implement PvP Game Board", thuộc Epic SCRUM-71, ước lượng 8 SP)

**Kết quả trên Jira:**

| Ticket | Type | SP | Mô tả |
|---|---|---|---|
| SCRUM-200 | Story | *(không gán)* | BA Clarification + Tech Spec overview |
| SCRUM-201 | Task | 3 | `[SCRUM-200] Setup game board store + domain types` |
| SCRUM-202 | Task | 3 | `[SCRUM-200] Implement board UI components` |
| SCRUM-203 | Task | 2 | `[SCRUM-200] Connect socket gateway + integrate UC` |

- Mỗi Task: link "Relates" → SCRUM-200, link_to_epic → SCRUM-71
- Mỗi Task có Implementation Steps riêng, kết thúc bằng Build Verify + Manual Test
- Tổng SP: 3 + 3 + 2 = 8 = estimate ban đầu

---

### Ví dụ 3: Task/Bug nhỏ (< 5 SP) — Giữ nguyên Atomic

**Input:** `SCRUM-139` (Task — "Fix log file rotation", 2 SP)

**Kết quả:** Không tạo subtask. Implementation Steps viết trực tiếp trong Description của SCRUM-139.

---

### Ví dụ 4: Task lớn (>= 5 SP) — Tách Subtasks

**Input:** `SCRUM-180` (Task — "Refactor AuthService", 5 SP)

**Kết quả trên Jira:**

| Ticket | Type | SP | Mô tả |
|---|---|---|---|
| SCRUM-180 | Task | 5 | Tech Spec + Implementation Steps overview |
| SCRUM-181 | Subtask | 2 | `[SCRUM-180] Extract TokenService` |
| SCRUM-182 | Subtask | 2 | `[SCRUM-180] Extract SocialLoginService` |
| SCRUM-183 | Subtask | 1 | `[SCRUM-180] Update DI + Build Verify + Manual Test` |

- Subtasks tạo bằng `create_issue` với `additional_fields: {"parent": "SCRUM-180"}` — Jira tự gán key

---

## ✅ ĐỊNH NGHĨA HOÀN THÀNH (DoD)
- [ ] Parent ticket đã có block **Business Clarification + Technical Spec + PM Decision**.
- [ ] **Story/Feature**: Đã tạo ít nhất 1 Task ngang hàng, link "Relates" + link_to_epic.
- [ ] **Story/Feature**: Story KHÔNG gán SP. SP nằm ở Tasks.
- [ ] **Task/Bug >= 5 SP**: Đã tạo Subtasks đầy đủ.
- [ ] **BẮT BUỘC:** Story point estimate đã cập nhật trên Jira field.
- [ ] **BẮT BUỘC:** Implementation Steps có "Build Verify" + "Manual Test" ở 2 bước cuối (trừ Story/Epic).
- [ ] Dev nhận task không cần phải hỏi lại về Technical Approach hay Impacted Files.

---
*Created by Antigravity AI Engineering Team*