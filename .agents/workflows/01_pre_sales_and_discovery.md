---
description: Quy trình khảo sát, Discovery và cập nhật Requirements cho dự án
---

# 🚀 01. Pre-sales & Discovery Workflow (Jira-ready)

---

> [!IMPORTANT]
> **KỸ NĂNG YÊU CẦU (BẮT BUỘC)**
> Các Agent **BẮT BUỘC** phải tải/đọc (`view_file`) file Hướng dẫn Kỹ năng tương ứng từ `.agents/skills/` trước khi làm việc:
> - **@Managing_Director_PM**: Nạp skill `plan` và `brainstorm`.
> - **@BA**: Nạp skill `persona`, `write`, `plan`.
> - **@Tech_Lead**: Nạp skill `architect`, `code`.
> - **@Senior_Dev**: Nạp skill `code`, `unit-test`.

---

## 🎯 Mục tiêu
Quy trình này giúp team xác định đúng nhu cầu thực tế của khách hàng, phân tích pain points, chốt scope, và ghi nhận kết quả vào **Jira + Jira-linked Pages / Confluence** để sẵn sàng chuyển sang Sprint Planning.

Workflow này đảm bảo:
- ✅ Nhu cầu khách hàng được làm rõ, không suy đoán
- ✅ Scope được chốt có lý do rõ ràng
- ✅ Requirement được ghi lại thành tài liệu chính thức
- ✅ Backlog tickets được tạo/cập nhật trên Jira
- ✅ PM có thể bàn giao sang Sprint Planning mà không thiếu context

---

## ⚠️ QUY TẮC BẮT BUỘC

> **OUTPUT CHÍNH** của workflow này là:
> 1. **Requirements Page** được cập nhật đầy đủ
> 2. **Jira Backlog Tickets** được tạo hoặc cập nhật
> 3. **Scope Decision** được ghi nhận rõ ràng
> 4. **Backlog Ready for Sprint Planning**

### ✅ Được phép
- Đặt câu hỏi, phân tích, tư vấn, thảo luận scope
- Đọc Requirements / Discovery Pages trên Jira-linked Pages / Confluence
- Cập nhật Page / Requirement doc
- Tạo / cập nhật Jira backlog tickets
- Ghi nhận các quyết định `In Scope / Deferred / Descoped / Cancelled`

### ❌ CẤM TUYỆT ĐỐI
- Viết code
- Chỉnh sửa file source `.ts`, `.tsx`, `.css`, `.sql`
- Chạy lệnh terminal (trừ khi team có rule riêng cho git commit docs)
- Tự ý chốt scope nếu chưa có quyết định từ `@Managing_Director_PM`

---

## 👥 VAI TRÒ & QUY TRÌNH THỰC HIỆN

### 🟦 Giai đoạn 1: Discovery & Khảo sát nhu cầu (@BA + @Managing_Director_PM)
*BA và PM phối hợp để hiểu đúng bài toán thực tế của khách hàng.*

#### Việc cần làm
- Đọc thông tin đầu vào từ khách hàng / stakeholder
- Đặt câu hỏi để hiểu:
  - ai là người dùng chính
  - họ dùng tính năng để làm gì
  - tần suất sử dụng
  - pain points hiện tại
  - mục tiêu mong muốn
- Không giả định requirement nếu chưa được xác nhận

#### Ví dụ câu hỏi
- Tính năng này dành cho ai?
- Tình huống nào khiến người dùng cần tính năng này?
- Điều gì đang gây khó khăn nhất hiện tại?
- Nếu không làm tính năng này thì ảnh hưởng gì?
- Tính năng này có bắt buộc cho phase đầu không?

#### Đầu ra
- Discovery notes
- Danh sách pain points
- Dự thảo business goal
- Dự thảo acceptance criteria sơ bộ

---

### 🟩 Giai đoạn 2: Phân tích Pain Points & Đề xuất Scope (@BA)
*BA tổng hợp và đánh giá lại dữ liệu discovery.*

#### Việc cần làm
- Tổng hợp những gì đã thu thập
- Nhóm các nhu cầu thành:
  - bắt buộc
  - nên có
  - có thể để sau
- Đề xuất:
  - nên làm
  - chưa nên làm
  - loại bỏ
- Làm rõ:
  - In Scope
  - Out of Scope
  - Deferred items

#### Đầu ra
- Business / Discovery Summary
- Scope recommendation
- Requirement draft cho từng item chính

---

### 🟨 Giai đoạn 3: Chốt Scope & Ưu tiên (@Managing_Director_PM)
*PM là người ra quyết định cuối cùng về scope.*

#### Việc cần làm
- Review kết quả discovery từ BA
- Quyết định cho từng item:
  - `In Scope`
  - `Deferred`
  - `Descoped`
  - `Cancelled`
- Gán mức độ ưu tiên
- Gán milestone / sprint candidate sơ bộ nếu phù hợp

#### Đầu ra
- Scope Decision Summary
- Prioritized backlog direction
- Xác nhận item nào đủ điều kiện đi tiếp sang planning

---

### 🟪 Giai đoạn 4: Feasibility Check sơ bộ (Optional - @Tech_Lead / @Senior_Dev)
*Chỉ tham gia khi cần rà soát tính khả thi sơ bộ.*

#### Việc cần làm
- Đưa ra cảnh báo kỹ thuật lớn nếu có
- Ghi nhận risk / constraint sơ bộ
- Không đi vào thiết kế chi tiết ở workflow này

#### Đầu ra
- Feasibility notes (nếu cần)

---

## 📝 GIAI ĐOẠN GHI LẠI QUYẾT ĐỊNH

### 1. Cập nhật Requirements Page ← Output bắt buộc
Ưu tiên cập nhật trên **Jira-linked Pages / Confluence**.

#### Cần cập nhật
- Thêm section mới cho feature / scope item đã được chốt
- Ghi rõ:
  - business goal
  - target user
  - acceptance criteria
  - out of scope
  - decision date
  - decision reason
- Với item bị loại bỏ:
  - đánh dấu `REMOVED / DESCOPED`
  - **không xóa hẳn** để giữ lịch sử

---

### 2. Cập nhật Jira Backlog ← Output bắt buộc
`@Managing_Director_PM` chịu trách nhiệm tạo hoặc cập nhật backlog tickets trên Jira.

#### Mỗi backlog ticket nên có
- Title
- Business Goal
- User Value
- Pain Point
- Acceptance Criteria (draft)
- Scope Decision
- Priority
- Story Points sơ bộ
- Milestone / Sprint candidate

#### Với ticket bị loại / hoãn
- Ghi rõ:
  - `Deferred`
  - `Descoped`
  - `Cancelled`
- Có lý do đi kèm
- Không xóa lịch sử nếu team cần trace

---

## 📝 TEMPLATE APPEND VÀO JIRA TICKET

> [!TIP]
> Luôn append vào cuối Description hiện tại để không làm mất thông tin gốc.

```markdown
---
### 🟦 Discovery Summary (by @BA)
- **Business Goal**: ...
- **Target User**: ...
- **Pain Points**:
  1. ...
  2. ...
- **Usage Context**: ...
- **Acceptance Criteria (Draft)**:
  1. [AC 1]
  2. [AC 2]

### 🟨 Scope Decision (by @Managing_Director_PM)
- **Decision**: [In Scope / Deferred / Descoped / Cancelled]
- **Reason**: ...
- **Priority**: ...
- **Target Milestone / Sprint**: ...

### 🟩 Feasibility Note (Optional by @Tech_Lead)
- **Technical Risk**: ...
- **Constraint**: ...
- **Note**: ...
```

---

## 🔄 ĐỒNG BỘ & BÁO CÁO

### Cập nhật Jira qua MCP
- Tạo / update backlog tickets
- Update Description cho từng ticket
- Gắn link Requirements Page / Design Page nếu có
- Update milestone / label / priority theo quyết định của PM

---

## 🚚 BÀN GIAO SANG SPRINT PLANNING

Workflow được phép chuyển sang Sprint Planning khi:
- Requirements đã được cập nhật đầy đủ
- Backlog tickets đã được tạo / cập nhật
- Scope đã được PM chốt
- Acceptance criteria draft đủ rõ
- Ticket đủ điều kiện để Tech Lead / Senior Dev tiếp nhận ở workflow planning

---

## ✅ ĐỊNH NGHĨA HOÀN THÀNH (DoD)
- [ ] Requirements Page đã được cập nhật đầy đủ
- [ ] Jira backlog tickets đã được tạo hoặc cập nhật
- [ ] Scope Decision đã được ghi rõ cho từng item chính
- [ ] Item bị hoãn / bị loại có lý do rõ ràng
- [ ] PM xác nhận backlog đã đủ rõ để chuyển sang Sprint Planning
- [ ] Team nhận ticket không cần hỏi lại về business goal hay scope cơ bản

---

*Created by Antigravity AI Engineering Team*
