---
name: jira-mcp
description: Kỹ năng chuyên sâu để khai thác dữ liệu từ Jira và Confluence thông qua MCP. Đặc biệt hữu ích khi cần lấy Comments, Remote Links (Design/Wiki) và thông tin mở rộng của Issue.
---

# Jira MCP Skill

Kỹ năng này giúp bạn làm việc hiệu quả với bộ công cụ Atlassian MCP, tập trung vào việc truy xuất những thông tin "ẩn" hoặc yêu cầu tham số đặc biệt như Comments và Remote Links (Web Links/Design Links).

## When to use this skill

- Khi cần đọc toàn bộ lịch sử thảo luận (Comments) của một task.
- Khi cần tìm link thiết kế (Figma, Prototype) hoặc tài liệu liên quan được đính kèm dưới dạng Web Link/Remote Link.
- Khi `jira_get_issue` mặc định không hiển thị đủ thông tin bạn cần.

## How to use it

### 1. Lấy Comments (Bình luận)
Mặc định `jira_get_issue` có thể ẩn phần comment để tiết kiệm token. Bạn **phải** chỉ định rõ:
- **Tool:** `jira_get_issue`
- **Tham số:** `comment_limit: 10` (hoặc số lượng bạn cần).
- **Cấu trúc kết quả:** Dữ liệu sẽ nằm trong trường `comments[]`.

### 2. Lấy Remote Links (Design/Wiki/Web Links)
Các link đến Figma hoặc trang Confluence thường được lưu ở dạng "Remote Link". Để lấy chúng:
- **Tool:** `jira_get_issue`
- **Tham số:** `expand: "remotelink"`
- **Lưu ý:** Nếu kết quả JSON vẫn không hiện URL trực tiếp, hãy kiểm tra phần `changelog` (dùng `expand: "changelog"`) để tìm `to_string` của link.

### 3. Truy xuất URL từ Confluence Title (Biết từ Jira)
Nếu Jira chỉ trả về một Title (ví dụ: `learn.html`) trong phần `to_string` của Remote Link, bạn **đừng chỉ search**, hãy dùng lệnh lấy trực tiếp trang:
- **Tool:** `mcp_mcp-atlassian_confluence_get_page`
- **Tham số:** `title: "learn.html"`, `space_key: "SCRUM"` (hoặc space tương ứng).
- **Mục tiêu:** Lấy được nội dung HTML/Markdown của trang thiết kế đó ngay lập tức mà không cần qua bước search trung gian nếu đã chắc chắn về tiêu đề.

### 4. Kiểm tra lịch sử thay đổi (Changelog)
Khi một thông tin bị mất hoặc không rõ nguồn gốc, hãy kiểm tra:
- **Tool:** `jira_get_issue`
- **Tham số:** `expand: "changelog"`
- **Công dụng:** Giúp xác định ai đã thêm link gì và khi nào, ngay cả khi link đó bị ghi đè hoặc ẩn đi.

### 5. Cập nhật Story Points (SP)
Để cập nhật thông số Story Point cho một ticket (đặc biệt quan trọng sau phase Breakdown):
- **Tool:** `jira_update_issue`
- **Tham số:** `fields: "{\"customfield_10016\": 5}"` (Thay số 5 bằng giá trị SP thực tế).
- **Lưu ý:** Story Point trong Jira Cloud thường là `customfield_10016`. Nếu không chắc chắn, hãy dùng `jira_search_fields` với keyword "Story point".

### 6. Cập nhật Sprint
Để gán một issue vào Sprint:
- **Tool:** `jira_update_issue`
- **Tham số:** `fields: "{\"customfield_10020\": sprint_id}"`
- **Lưu ý:** Sprint ID là một số nguyên (integer).

## Common Fields Reference
- `customfield_10016`: Story point estimate (Number)
- `customfield_10020`: Sprint (Array/ID)
- `parent`: Parent issue key (cho Subtasks)
- `priority`: Priority object (e.g., `{"name": "High"}`)
- Luôn kết hợp `expand: "renderedFields"` nếu bạn muốn đọc mô tả task dưới dạng HTML sạch hơn (nếu Markdown bị lỗi format).
- Nếu task quá phức tạp, hãy sử dụng `jira_get_issue` với `fields: "*all"` để đảm bảo không bỏ sót custom fields.
- Khi Jira nhắc đến "Web Links đính kèm", 90% nó nằm trong `remotelink` hoặc `changelog`.
