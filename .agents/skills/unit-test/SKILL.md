---
name: unit-test
description: Chuyên gia viết Unit Test chuẩn mực, bao phủ toàn diện Happy Path và Unhappy Path (Edge Cases, Exceptions). 
---

# Kỹ năng viết Unit Test chuyên nghiệp

Skill này cung cấp bộ quy chuẩn và hướng tư duy để viết Unit Test chất lượng cao, có khả năng phát hiện lỗi ngầm (regression bugs) và hoạt động như một bộ tài liệu sống cho mã nguồn.

## 1. Tư duy "Happy Path" & "Unhappy Path"

Một Unit Test chuyên nghiệp không bao giờ chỉ test trường hợp code chạy đúng.

### ✅ Happy Path (Luồng thành công)
- Là trường hợp dữ liệu đầu vào chuẩn xác, các dependency hoạt động bình thường, và output trả về đúng như mong đợi.
- **Mục tiêu:** Chứng minh "Tính năng này làm đúng công việc chính của nó".
- **Ví dụ:** Hàm `parseFEN` nhận vào FEN chuẩn và trả ra state board đúng.

### ❌ Unhappy Path (Luồng thất bại / Ngoại lệ)
- Là trường hợp dữ liệu sai, bị rỗng, sai định dạng, vượt quá giới hạn (out of bounds), hoặc dependency bị lỗi (Network rớt, DB lỗi).
- **Mục tiêu:** Chứng minh "Hệ thống biết cách tự bảo vệ và quăng lỗi rõ ràng thay vì chết ngầm".
- Cần chia nhỏ Unhappy Path thành:
  - **Edge Cases (Góc ngách):** Giá trị ở sát ranh giới (0, -1, max_int, chuỗi siêu dài).
  - **Invalid Inputs (Đầu vào rác):** Dữ liệu null, undefined, sai kiểu (truyền chuỗi thay vì số).
  - **Exceptions (Ngoại lệ):** Yêu cầu code quăng đúng loại Error (dùng `expect().toThrow`).

## 2. Tiêu chuẩn viết Test (AAA Pattern)

Bất kỳ test case nào cũng phải tuân thủ nghiêm ngặt **A-A-A Pattern**:

1. **Arrange (Chuẩn bị):**
   - Setup môi trường, khởi tạo Mock data, stub các dependency cần thiết.
   - Giữ phần Arrange càng ngắn gọn càng tốt (dùng Factory, Builder pattern nếu cần).

2. **Act (Thực thi):**
   - Gọi đúng 1 hàm/method đang cần test.
   - Không lồng ghép logic tính toán phức tạp ở phần này.

3. **Assert (Xác nhận):**
   - So sánh kết quả trả về của hàm với kết quả kỳ vọng (Expected).
   - Test 1 hành vi duy nhất (Single Assertion Concept), không viết 1 test case kiểm tra quá nhiều thứ không liên quan nhau.

## 3. Quy tắc Đặt tên Test Case

Tên test case phải mô tả rõ ràng **Ngữ cảnh**, **Hành động**, và **Kết quả kỳ vọng**:
- Cấu trúc chuẩn: `it('should [kết_quả_kỳ_vọng] when [ngữ_cảnh_và_hành_động]')`
- VD: `it('should throw Error when parsing FEN with invalid piece type')`
- VD: `it('should return empty list when pawn has no valid moves')`

## 4. Tách biệt Dependencies (Mocking / Stubbing)

- Unit test bảo vệ 1 "Unit" (1 hàm, 1 class độc lập). Tính biệt lập (Isolation) là số 1.
- Tuyệt đối KHÔNG gõ DB thật, KHÔNG gọi API bên ngoài (Network thật) trong Unit Test.
- Sử dụng công cụ Mocking (Ví dụ: `vi.mock` trong Vitest, `jest.mock`) để giả mạo các API call/DB call.

## Phân công trách nhiệm:

- **@Senior_Dev:** Tuân thủ AAA, luôn viết test bọc cả Happy/Unhappy path khi release tính năng mới. Test không thể xanh (Pass) nếu code xử lý lỗi chưa được viết.
- **@QA:** Nghĩ ra các kịch bản Unhappy path oái oăm nhất, review test coverage report.
- **@Tech_Lead:** Đảm bảo toàn dự án sử dụng chung 1 thư viện (như Vitest), 1 pattern (AAA), và không mock sai cách làm giảm tính chính xác của Test.
