---
description: Thiết lập môi trường, Repository và CI/CD cơ bản
---

# 🚀 03. Sprint Zero Setup Workflow (Jira-only)

---

> [!IMPORTANT]
> **KỸ NĂNG YÊU CẦU (BẮT BUỘC)**
> Các Agent **BẮT BUỘC** phải tải/đọc (`view_file`) file Hướng dẫn Kỹ năng tương ứng từ `.agents/skills/` trước khi làm việc:
> - **@Managing_Director_PM**: Nạp skill `plan` và `brainstorm`.
> - **@Tech_Lead**: Nạp skill `architect` và `code`.
> - **@Senior_Dev**: Nạp skill `code` và `unit-test`.
> - **@BA / @QA**: Nạp skill `persona`, `write`, `plan`.
> - **@Designer**: Nạp skill `persona`, `slide`.

---

## 🎯 Mục tiêu
Giai đoạn chuẩn bị toàn bộ nền tảng kỹ thuật, quản trị, thiết kế và kiểm thử trước khi bắt đầu các Sprint phát triển tính năng.

Workflow này đảm bảo:
- ✅ Repository và quyền truy cập được thiết lập đúng
- ✅ CI/CD baseline sẵn sàng cho môi trường Development
- ✅ Design workspace và test management đã được khởi tạo
- ✅ Definition of Done được chốt thống nhất
- ✅ Jira là nơi quản lý công việc chính
- ✅ Confluence / Jira-linked Pages là nơi lưu tài liệu chính thức
- ✅ Team sẵn sàng bước vào Sprint Planning mà không thiếu nền tảng vận hành

---

## ⚠️ QUY TẮC BẮT BUỘC

> **INPUT**: Project kickoff đã hoàn tất, scope tổng thể đã được xác nhận, team chuẩn bị bước vào Sprint Zero.

### 📦 Đầu ra chính (Output)
1. **Jira Epic** được tạo hoặc cập nhật: `Sprint Zero Setup`
2. **Các Jira parent tickets** được tạo hoặc cập nhật:
   - `Source Control Setup`
   - `CI/CD Baseline`
   - `Design Workspace Setup`
   - `Test Management Setup`
   - `Definition of Done Alignment`
   - `Project Documentation & Linking Setup`
3. **Description của từng ticket** được cập nhật rõ:
   - Goal
   - Scope
   - Owner
   - Acceptance Criteria
   - Deliverables
4. **Subtasks** chỉ được tạo khi hạng mục đủ lớn và cần track riêng
5. **Confluence / Jira-linked Pages** được cập nhật nếu có tài liệu liên quan
6. **Repo** chỉ chứa các deliverables thật sự cần chạy hoặc cần version control như config, script, CI files, templates kỹ thuật

### 🚫 Giới hạn hành động
- ✅ **Nên làm**: Đọc project context, kickoff notes, planning notes, linked Pages / Confluence
- ✅ **Nên làm**: Cập nhật Jira tickets qua MCP
- ✅ **Nên làm**: Tạo file config, script setup, checklist hoặc guideline cần thiết trong repo nếu thật sự phục vụ vận hành
- ✅ **Nên làm**: Gắn link Jira ↔ Confluence ↔ Repo
- ❌ **CẤM TUYỆT ĐỐI**: Tạo hệ thống quản lý kép ngoài Jira nếu team đã chọn Jira làm nguồn quản lý chính
- ❌ **CẤM TUYỆT ĐỐI**: Tự ý đổi scope Sprint Zero nếu chưa có xác nhận từ `@Managing_Director_PM`

---

## 👥 VAI TRÒ & QUY TRÌNH THỰC HIỆN

### 🟦 Giai đoạn 1: Source Control Setup
**Vai trò chính:** `@Tech_Lead`, `@Managing_Director_PM`

#### Việc cần làm
- `@Tech_Lead`:
  - khởi tạo cấu trúc repository
  - xác lập convention branch / Git Flow
  - chuẩn hóa thư mục gốc dự án
- `@Managing_Director_PM`:
  - xác định thành viên cần quyền truy cập
  - cấp quyền phù hợp theo vai trò

#### Jira ticket khuyến nghị
- `Source Control Setup`

#### Deliverables
- Repository sẵn sàng
- Git convention / branching strategy
- Access setup hoàn tất

---

### 🟩 Giai đoạn 2: CI/CD Baseline
**Vai trò chính:** `@Tech_Lead`, `@Senior_Dev`

#### Việc cần làm
- thiết lập pipeline cơ bản cho Development
- chuẩn bị GitHub Actions / CI config
- đảm bảo có bước build/test baseline
- xác định điều kiện tối thiểu để pull request được kiểm tra tự động

#### Jira ticket khuyến nghị
- `CI/CD Baseline`

#### Deliverables
- file CI workflow
- rule chạy unit test hoặc build verify
- mô tả ngắn cho pipeline baseline trong Jira/Confluence nếu cần

#### Ví dụ lệnh
`@Tech_Lead /write Hãy soạn thảo file cấu hình GitHub Actions cơ bản để tự động chạy Unit Test khi có PR.`

---

### 🟨 Giai đoạn 3: Design Workspace Setup
**Vai trò chính:** `@Designer`

#### Việc cần làm
- setup file Figma
- seed Design System cơ bản
- chốt design direction ban đầu
- gắn link design vào Jira / Confluence

#### Jira ticket khuyến nghị
- `Design Workspace Setup`

#### Deliverables
- Figma workspace
- design system seed
- design direction reference

---

### 🟪 Giai đoạn 4: Test Management Setup
**Vai trò chính:** `@QA`

#### Việc cần làm
- setup công cụ log bug
- setup nơi quản lý test cases / test checklist
- chuẩn hóa cách QA theo dõi ticket, bug, verify result

#### Jira ticket khuyến nghị
- `Test Management Setup`

#### Deliverables
- bug tracking setup
- test case workspace / checklist
- quy ước QA tracking ban đầu

---

### 🟥 Giai đoạn 5: Definition of Done Alignment
**Vai trò chính:** `@Managing_Director_PM`, `@Tech_Lead`, `@QA`

#### Việc cần làm
- thống nhất tiêu chuẩn để một ticket được coi là hoàn thành
- chốt các điều kiện tối thiểu như:
  - build pass
  - review xong
  - test xong
  - design check nếu cần
  - docs cập nhật nếu cần

#### Jira ticket khuyến nghị
- `Definition of Done Alignment`

#### Deliverables
- tài liệu DoD chính thức
- decision summary
- link page guideline nếu có

---

### 🟧 Giai đoạn 6: Project Documentation & Linking Setup
**Vai trò chính:** `@Managing_Director_PM`, `@Tech_Lead`, `@BA`

#### Việc cần làm
- chuẩn hóa cách dùng Jira làm nơi quản lý công việc chính
- chuẩn hóa nơi lưu documentation trên Confluence / Pages
- xác định page nào chứa:
  - requirements
  - architecture
  - DoD
  - sprint notes
  - design links
- đảm bảo ticket nào cần tài liệu đều có link tài liệu liên quan
- thống nhất cách link giữa Jira ↔ Confluence ↔ Repo

#### Jira ticket khuyến nghị
- `Project Documentation & Linking Setup`

#### Deliverables
- cấu trúc page/doc chuẩn
- rule link ticket ↔ page ↔ repo
- project documentation map

---

## 📝 TEMPLATE APPEND VÀO JIRA PARENT TICKET

> [!TIP]
> Luôn append vào cuối Description hiện tại để không làm mất thông tin gốc.

```markdown
---
### Summary
- **Goal**: ...
- **Owner**: ...
- **Scope**: ...
- **Dependencies**: ...

### Setup Plan
1. ...
2. ...
3. ...

### Acceptance Criteria
- [ ] ...
- [ ] ...
- [ ] ...

### Deliverables
- ...
- ...
- ...
```

---

## 🔄 ĐỒNG BỘ & BÁO CÁO

### Cập nhật Jira qua MCP
- Tạo hoặc update Epic `Sprint Zero Setup`
- Tạo hoặc update các parent tickets chính
- Append Description cho từng ticket
- Chỉ tạo subtasks khi một hạng mục đủ lớn để cần tracking riêng
- Nếu có page liên quan, cập nhật link Pages / Confluence vào ticket

### Cập nhật Confluence / Pages
- Tạo hoặc update các page cần thiết:
  - Requirements
  - Architecture
  - Definition of Done
  - Sprint notes
  - Design reference
- Gắn link ngược về Jira ticket nếu cần

---

## ✅ ĐỊNH NGHĨA HOÀN THÀNH (DoD)
- [ ] Epic `Sprint Zero Setup` đã được tạo hoặc cập nhật
- [ ] Các parent ticket chính đã có Description rõ ràng
- [ ] Repository, CI/CD baseline, design workspace, test management, DoD và documentation linking đều đã được setup
- [ ] Nếu có subtasks cần thiết, chúng đã được tạo đầy đủ trên Jira
- [ ] Team có thể bước vào Sprint Planning / Sprint Development mà không thiếu nền tảng vận hành

---

*Created by Antigravity AI Engineering Team*
