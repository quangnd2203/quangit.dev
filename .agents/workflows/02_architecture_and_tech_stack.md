---
description: Thiết kế kiến trúc hệ thống và chốt Tech Stack
---

# 🚀 02. Architecture & Tech Stack Workflow (Jira-ready)

---

> [!IMPORTANT]
> **KỸ NĂNG YÊU CẦU (BẮT BUỘC)**
> Các Agent **BẮT BUỘC** phải tải/đọc (`view_file`) file Hướng dẫn Kỹ năng tương ứng từ `.agents/skills/` trước khi làm việc:
> - **@Managing_Director_PM**: Nạp skill `plan` và `brainstorm`.
> - **@Tech_Lead**: Nạp skill `architect` và `code`.
> - **@BA**: Nạp skill `persona`, `write`.
> - **@Designer**: Nạp skill `persona`, `slide`.

---

## 🎯 Mục tiêu
Quy trình phối hợp giữa **@Tech_Lead**, **@BA**, **@Designer**, và **@Managing_Director_PM** nhằm thiết kế “xương sống” cho hệ thống trước khi bước vào phát triển chi tiết, đảm bảo:

- ✅ **Tech Stack rõ ràng**: Framework, database, platform được chốt có căn cứ.
- ✅ **Architecture thực tế**: Luồng module, boundary và cách tổ chức hệ thống đủ rõ để team cùng bám theo.
- ✅ **Database Schema cốt lõi**: Các thực thể và quan hệ chính được xác định sớm.
- ✅ **UI/UX Concept thống nhất**: Design direction rõ ràng, không lệch phong cách.
- ✅ **Technical Guideline sẵn sàng**: Coding rule, project structure, clean architecture guideline được chốt.
- ✅ **Jira Sẵn sàng**: Description của từng ticket đủ làm “kim chỉ nam” cho team triển khai.

---

## ⚠️ QUY TẮC BẮT BUỘC

> **INPUT**: Một initiative, architecture kickoff, project requirement, hoặc một Jira Epic / Issue Key liên quan đến thiết kế nền tảng hệ thống.

### 📦 Đầu ra chính (Output)
1. **Jira Epic** được tạo hoặc cập nhật: `Architecture & Tech Stack`
2. **Các Jira Tickets chính** được tạo hoặc cập nhật:
   - `Decide Core Tech Stack`
   - `Design High-level Architecture`
   - `Define Core Database Schema`
   - `Establish UI/UX Concept`
   - `Finalize Technical Guidelines`
3. **Description của từng Parent Ticket** được cập nhật đầy đủ với:
   - Business / Context Clarification
   - Technical Analysis / Recommendation
   - PM Decision Summary
4. **Jira Subtasks (Nếu cần)** chỉ được tạo cho các ticket đủ lớn, có nhiều phần độc lập cần track riêng.

### 🚫 Giới hạn hành động
- ✅ **Nên làm**: Đọc Requirements, Design, Business Context từ **Jira-linked Pages / Confluence**
- ✅ **Nên làm**: Nếu có local mirror trong repo thì dùng để đối chiếu thêm
- ✅ **Nên làm**: Scan source code / project structure hiện tại nếu project đã có codebase
- ✅ **Nên làm**: Sử dụng `view_file`, `grep_search`, `view_file_outline`
- ❌ **CẤM TUYỆT ĐỐI**: Viết code business logic, chỉnh sửa file source `.ts`, `.tsx`, `.sql`
- ❌ **CẤM TUYỆT ĐỐI**: Chạy terminal nếu workflow này chỉ nhằm mục tiêu quyết định kiến trúc
- ❌ **CẤM TUYỆT ĐỐI**: Tự ý đổi scope business hoặc chốt stack/architecture nếu chưa có kết luận từ PM

---

## 👥 VAI TRÒ & QUY TRÌNH THỰC HIỆN

### 🟦 Giai đoạn 1: Clarify Bối cảnh & Nhu cầu hệ thống (@BA)
*BA làm rõ bài toán nghiệp vụ và phạm vi cần phục vụ của kiến trúc.*

- **Việc cần làm**:
  - Đọc Jira ticket, Requirements, Design, PRD trên Pages / Confluence
  - Xác định:
    - Business Goal
    - Quy mô hệ thống
    - Các domain/module chính
    - Ràng buộc nghiệp vụ
    - Non-functional needs nếu có
  - Làm rõ những gì **nằm ngoài phạm vi**
- **Đầu ra**: Soạn block `Business / Context Clarification`

---

### 🟩 Giai đoạn 2: Quyết định Tech Stack (@Tech_Lead)
*Tech Lead phân tích lựa chọn công nghệ cốt lõi.*

- **Việc cần làm**:
  - So sánh các framework / platform / database options
  - Chốt framework chính
  - Chốt database type
  - Nêu rõ trade-off, limitation, upgrade path
- **Ví dụ nội dung cần quyết định**:
  - Flutter hay Web stack nào
  - Odoo 16 hay Odoo 17
  - PostgreSQL hay lựa chọn khác
  - Kiến trúc monolith / modular / hybrid
- **Đầu ra**: Block `Tech Stack Decision`

---

### 🟨 Giai đoạn 3: Thiết kế High-level Architecture (@Tech_Lead)
*Tech Lead thiết kế luồng tương tác giữa các phần lớn của hệ thống.*

- **Việc cần làm**:
  - Xác định các module/domain chính
  - Thiết kế luồng dữ liệu giữa các module
  - Xác định integration boundaries
  - Xác định dependency direction
  - Ghi rõ các giả định mở rộng, scale, deployment
- **Đầu ra**: Block `High-level Architecture Summary`

---

### 🟪 Giai đoạn 4: Thiết kế Database Schema (@Tech_Lead + @BA)
*Tech Lead phối hợp BA để định hình dữ liệu cốt lõi.*

- **Việc cần làm**:
  - Xác định các entity/bảng dữ liệu quan trọng
  - Chốt các relationship cốt lõi
  - Xác định ownership giữa module
  - Rà soát tính phù hợp với nghiệp vụ
- **Đầu ra**: Block `Database Schema Summary`

---

### 🟧 Giai đoạn 5: Định hình UI/UX Concept (@Designer + @BA)
*Designer phối hợp BA để chốt hướng thiết kế phù hợp với hệ thống enterprise.*

- **Việc cần làm**:
  - Xác định design direction
  - Chốt màu sắc, typography, layout principle
  - Xác định phong cách enterprise / professional / usability
  - Nếu có, gắn link Figma / Whiteboard / Design Page
- **Đầu ra**: Block `UI/UX Concept Summary`

---

### 🟥 Giai đoạn 6: Chốt Technical Guideline (@Tech_Lead)
*Tech Lead chốt quy chuẩn triển khai cho toàn đội dev.*

- **Việc cần làm**:
  - Thiết lập coding guideline
  - Kiểm soát cấu trúc dự án
  - Đảm bảo không có nested projects
  - Toàn bộ dependencies ở root nếu đó là rule của team
  - Áp dụng / tham chiếu cấu trúc chuẩn từ `../templates/09_standard_clean_architecture.md`
- **Đầu ra**: Block `Technical Guideline Summary`

---

### 🟨 Giai đoạn 7: Chốt quyết định cuối cùng (@Managing_Director_PM)
*PM tổng hợp và ra quyết định cuối cùng cho từng hướng kiến trúc.*

- **Việc cần làm**:
  - Review kết quả từ BA, Tech Lead, Designer
  - Xác nhận:
    - stack đã hợp lý chưa
    - architecture đã đủ rõ chưa
    - schema đã đủ để bước tiếp chưa
    - guideline đã sẵn sàng chưa
  - Ra quyết định cuối cùng:
    - Keep as Single Ticket
    - hoặc Split thành các task/subtasks nếu một hạng mục còn quá lớn
  - Xác nhận trạng thái `Ready for Implementation`
- **Đầu ra**: Block `PM Decision Summary`

---

## 📝 TEMPLATES CHUẨN

### 1. Template Append vào Jira Parent Ticket
> [!TIP]
> Luôn append vào cuối Description hiện tại để không làm mất thông tin gốc.

```markdown
---
### 🟦 Business / Context Clarification (by @BA)
- **Business Goal**: ...
- **System Scope**: ...
- **Key Modules / Domains**:
  1. ...
  2. ...
- **Constraints**: ...
- **Out of Scope**: ...

### 🟩 Technical Analysis (by @Tech_Lead)
- **Impacted Areas**:
  - [module / layer / service]
  - [module / layer / service]
- **Tech Stack / Architecture Recommendation**: ...
- **Trade-offs**:
  - ...
  - ...
- **Risks / Edge Cases**:
  - ...
  - ...

### 🟪 Design / Schema / Guideline Notes
- **Database Notes**: ...
- **UI/UX Direction**: ...
- **Technical Guidelines**: ...

### 🟨 PM Decision Summary
- **Final Decision**: [Keep as Single Ticket / Split into Tasks / Split into Subtasks]
- **Ready for Implementation**: [Yes/No]
- **Note**: ...