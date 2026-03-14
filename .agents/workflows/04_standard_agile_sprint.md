---
description: Quy trình lặp Sprint chuẩn (Agile/Scrum) — lập kế hoạch và theo dõi tiến độ
---

# 🚀 04. Standard Agile Sprint Workflow (Jira-only)

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
Quy trình vận hành Sprint theo chu kỳ để duy trì tốc độ phát triển, kiểm soát phạm vi, và phản ứng linh hoạt trước thay đổi.

Workflow này đảm bảo:
- ✅ Sprint được lên kế hoạch rõ ràng trên Jira
- ✅ Ticket trong Sprint có scope, priority, dependencies và owner hợp lý
- ✅ Tiến độ được cập nhật định kỳ
- ✅ Sprint Review và Retrospective được ghi nhận đầy đủ
- ✅ Product Backlog được cập nhật sau mỗi Sprint
- ✅ Team có thể chuyển Sprint tiếp theo mà không mất ngữ cảnh

---

## ⚠️ QUY TẮC BẮT BUỘC

> **OUTPUT CHÍNH** của workflow này là:
> 1. **Sprint trên Jira** được tạo / cập nhật đầy đủ
> 2. **Sprint Planning Notes** được ghi trên Confluence / Jira-linked Pages
> 3. **Ticket status** trên Jira phản ánh đúng tiến độ thực tế
> 4. **Sprint Review** và **Sprint Retrospective** được cập nhật đầy đủ
> 5. **Product Backlog** được cập nhật lại sau Sprint

### ✅ Được phép
- Đặt câu hỏi, phân tích tiến độ, đánh giá ticket, tư vấn ưu tiên
- Đọc Jira backlog, sprint board, linked Pages / Confluence
- Cập nhật Sprint, ticket, priority, labels, notes trên Jira
- Cập nhật Sprint Review / Retrospective trên Confluence / Pages
- Đối chiếu local mirror nếu project vẫn còn giữ bản markdown nội bộ

### ❌ CẤM TUYỆT ĐỐI
- Viết code
- Chỉnh sửa file source `.ts`, `.tsx`, `.css`, `.sql`
- Chạy terminal để build/test trong workflow điều phối này, trừ khi có workflow kỹ thuật khác phụ trách cung cấp kết quả
- Tự ý thêm ticket mới giữa Sprint nếu chưa có quyết định rõ từ `@Managing_Director_PM`

---

## 👥 VAI TRÒ & QUY TRÌNH THỰC HIỆN

### 🟦 Bước 1: Sprint Planning (Đầu Sprint)
**Vai trò chính:** `@Managing_Director_PM`, `@Tech_Lead`, `@BA`

#### Việc cần làm
- rà soát Product Backlog trên Jira
- chọn ticket ưu tiên cao, phù hợp với velocity của team
- xác nhận Story Points, dependencies, risk
- chốt Sprint Goal
- đưa các ticket đã chọn vào Sprint hiện tại
- đảm bảo mọi ticket trong Sprint đều đủ rõ để team bắt đầu làm

#### Cập nhật bắt buộc
- **Jira Sprint**:
  - tạo Sprint mới hoặc cập nhật Sprint hiện tại
  - add/remove ticket đúng phạm vi
- **Confluence / Pages**:
  - tạo hoặc cập nhật Sprint Planning Notes
  - ghi:
    - Sprint Goal
    - Sprint Backlog
    - Dependencies
    - Risks
    - Definition of Done

#### Ghi chú về branch
- Nếu team có quy ước `sprint/XX`, chỉ ghi nhận như **technical convention**
- Không dùng workflow này để chạy lệnh git
- Việc tạo branch thực tế nên được thực hiện ở workflow kỹ thuật riêng hoặc trực tiếp bởi Dev/Tech Lead

---

### 🟩 Bước 2: Backlog Refinement (Giữa Sprint)
**Vai trò chính:** `@BA`, `@Managing_Director_PM`, `@Tech_Lead`

#### Việc cần làm
- rà soát các ticket trong Sprint còn mơ hồ
- bổ sung Acceptance Criteria còn thiếu
- làm rõ dependencies
- xác nhận task nào cần split thêm
- tránh scope creep

#### Quy tắc
- **Không thêm ticket mới giữa Sprint** trừ khi:
  - có blocker nghiêm trọng
  - có bug/hotfix khẩn cấp
  - PM xác nhận cần thay đổi phạm vi

#### Cập nhật bắt buộc
- cập nhật Description của ticket trên Jira
- cập nhật Planning Notes / linked Requirements Page nếu cần

---

### 🟨 Bước 3: Sprint Health Check (Định kỳ / Khi được gọi)
**Vai trò chính:** `@Managing_Director_PM`, `@QA`, `@Tech_Lead`

#### Việc cần làm
- đánh giá tiến độ thực tế của Sprint
- rà soát trạng thái ticket:
  - To Do
  - In Progress
  - In Review
  - Done
  - Blocked
- phát hiện blocker, risk, lệch scope
- xác nhận ticket nào có nguy cơ rollover

#### Cập nhật bắt buộc
- cập nhật trạng thái ticket trên Jira
- ghi blocker / risk vào Sprint Notes hoặc Daily Notes Page nếu có
- nếu cần, PM ra quyết định điều chỉnh ưu tiên trong phạm vi Sprint

---

### 🟪 Bước 4: Sprint Review (Cuối Sprint)
**Vai trò chính:** `@Managing_Director_PM`, `@Tech_Lead`, `@QA`

#### Việc cần làm
- đối chiếu Sprint Goal với kết quả thực tế
- kiểm tra ticket nào Done, ticket nào rollover
- rà soát bằng chứng hoàn thành:
  - trạng thái Jira
  - PR / merge
  - QA verification
  - demo / acceptance nếu có
- kiểm tra mức độ đạt Definition of Done

#### Cập nhật bắt buộc
- **Confluence / Pages**:
  - tạo hoặc cập nhật Sprint Review page
  - ghi:
    - planned SP vs delivered SP
    - trạng thái từng ticket
    - ticket rollover
    - technical notes
    - QA notes
- **Jira**:
  - đóng Sprint hoặc chuẩn bị close Sprint
  - update backlog cho ticket rollover / done

---

### 🟥 Bước 5: Sprint Retrospective (Cuối Sprint)
**Vai trò chính:** `@Managing_Director_PM`, `@Tech_Lead`, `@QA`, `@BA`

#### Việc cần làm
- tổng kết những gì làm tốt
- chỉ ra điểm nghẽn cần cải thiện
- đề xuất action items cho Sprint sau
- chốt cải tiến về:
  - process
  - communication
  - requirement quality
  - QA flow
  - technical workflow

#### Cập nhật bắt buộc
- **Confluence / Pages**:
  - tạo hoặc cập nhật Sprint Retrospective page
  - ghi:
    - What went well
    - What did not go well
    - Action items
    - Owner cho từng action item

---

## 📝 TEMPLATE APPEND / GHI NHẬN CHUẨN

### 1. Sprint Planning Summary
```markdown
### Sprint Planning Summary
- **Sprint Goal**: ...
- **Selected Tickets**:
  - SCRUM-101
  - SCRUM-102
  - SCRUM-103
- **Dependencies**:
  - ...
- **Risks**:
  - ...
- **Definition of Done**:
  - ...
```

### 2. Sprint Health Check Summary
```markdown
### Sprint Health Check
- **Progress Summary**: ...
- **Blocked Tickets**:
  - ...
- **Risks**:
  - ...
- **Potential Rollover**:
  - ...
- **PM Note**: ...
```

### 3. Sprint Review Summary
```markdown
### Sprint Review Summary
- **Planned SP**: ...
- **Delivered SP**: ...
- **Completed Tickets**:
  - ...
- **Rollover Tickets**:
  - ...
- **QA / Technical Notes**:
  - ...
```

### 4. Sprint Retrospective Summary
```markdown
### Sprint Retrospective
- **Went Well**:
  - ...
- **Needs Improvement**:
  - ...
- **Action Items**:
  - ...
- **Owner**:
  - ...
```

---

## 🔄 ĐỒNG BỘ & BÁO CÁO

### Cập nhật Jira qua MCP
- tạo / update Sprint
- add / remove tickets trong Sprint
- update ticket status, priority, labels nếu cần
- đảm bảo ticket phản ánh đúng thực tế triển khai
- cập nhật backlog sau Sprint

### Cập nhật Confluence / Pages
- Sprint Planning Notes
- Sprint Review
- Sprint Retrospective
- Daily Notes / Blocker Notes nếu team có dùng

### Local mirror (Optional)
Nếu project còn giữ local markdown:
- chỉ dùng như mirror phụ
- không dùng làm nguồn quản lý chính nếu Jira đã là source of truth

---

## ✅ ĐỊNH NGHĨA HOÀN THÀNH (DoD)
- [ ] Sprint đã được tạo / cập nhật đầy đủ trên Jira
- [ ] Sprint Planning Notes đã được ghi đầy đủ
- [ ] Ticket status trong Sprint phản ánh đúng thực tế
- [ ] Sprint Review đã được cập nhật
- [ ] Sprint Retrospective đã được cập nhật
- [ ] Product Backlog đã được cập nhật lại sau Sprint
- [ ] Team có thể bắt đầu Sprint tiếp theo mà không thiếu context

---

*Created by Antigravity AI Engineering Team*
