---
description: Quy trình lập trình tính năng và đẩy Pull Request
---

# 🚀 06. Feature Development Workflow (Jira-only, @Senior_Dev)

## 0) Bắt buộc đọc và tuân thủ chặt trước khi làm (theo thứ tự)
1) Root `@AGENTS.md`  
2) Working-dir `@AGENTS.md`  
3) Jira **Description** (parent/task)  
4) **Jira MCP Skill**: Sử dụng `jira-mcp` skill để lấy đầy đủ **Comments** và **Remote Links** (Design/Wiki/Changelog).  
5) **Design link** từ Jira/Confluence nếu UI.  
6) Nếu có subtasks: **đọc từng subtask** (desc + design) theo thứ tự.  
7) `clean-code-guide.md` + docs/rules linked khác.

**Nếu bất kỳ description/design chưa rõ → KHÔNG code.**  
→ Comment vào đúng ticket đó: "Needs clarification …" và nêu rõ điểm thiếu.

---

## 1) Jira Status Rules (bắt buộc)
- **Trước khi code task/parent**: chuyển **task/parent → `In Progress`** (chỉ khi rõ).  
- **Trước khi code từng subtask**: chuyển **subtask → `In Progress`** (chỉ khi rõ).  
- **Xong đâu chuyển đó**:
  - subtask xong → **subtask → `In Review`**
  - tất cả subtask xong → **parent/task → `In Review`**
- Nếu ticket mơ hồ: **comment + dừng**, không triển khai phần đó.

---

## 2) Git Rules (bắt buộc)

> Sử dụng **`git-worktree` skill** — mỗi task chạy trong thư mục worktree riêng biệt.

1) Xác định sprint hiện tại → map sang branch `sprint/XX`  
2) Tạo worktree + feature branch cho task (từ repo gốc):
```bash
cd <REPO_ROOT>
git fetch origin
git worktree add -b feature/[TASK-KEY] worktrees/[task-key] origin/sprint/XX
```
3) Chuyển vào worktree làm việc:
```bash
cd worktrees/[task-key]
```
4) Cài dependencies (chạy 1 lần):
```bash
cd front_end && npm install && cd ..
```

> ⚠️ Nếu branch đã tồn tại: `git worktree add worktrees/[task-key] feature/[TASK-KEY]`

❌ Không code trực tiếp trên `main/develop/sprint/XX`.  
❌ Không merge vào `sprint/XX` trong workflow này.  
❌ Không code ở repo gốc — chỉ code trong worktree.

---

## 3) Execution Steps

### A) Input là task nhỏ (không subtasks)
1) Read checklist (Mục 0)  
2) Nếu clear → task `In Progress`  
3) Implement theo description (không mở rộng scope)  
4) Chạy test/build verify theo project (`npm run build && npm run lint && npm run test`)  
5) Commit theo Conventional Commits:
   ```bash
   git add .
   git commit -m "feat(TASK-KEY): <summary>"
   ```
6) Push feature branch:
   ```bash
   git push origin feature/[TASK-KEY]
   ```
7) Task → `In Review`

### B) Input là parent task có subtasks
1) Read parent (Mục 0) → nếu clear: parent `In Progress`  
2) Với **mỗi subtask theo thứ tự**:
   - Read subtask → nếu clear: subtask `In Progress`
   - Implement subtask
   - Commit ngay cho subtask:
     ```bash
     git add .
     git commit -m "feat(TASK-KEY): <summary subtask>"
     ```
   - subtask → `In Review`
3) Chạy test/build verify tổng (`npm run build && npm run lint && npm run test`)  
4) Push feature branch (1 lần duy nhất, cuối cùng):
   ```bash
   git push origin feature/[TASK-KEY]
   ```
5) Parent → `In Review`

> ⚠️ **Chú ý thứ tự:** Commit từng subtask → verify tổng → push → chuyển parent In Review.

---

## 4) Commit Rules
- **Task nhỏ:** 1 task = 1 commit (hoặc nhiều hơn nếu task phức tạp).
- **Parent + subtasks:** Ưu tiên **1 subtask = 1 commit** (theo thứ tự subtask).
- **Format (Conventional Commits):**
```bash
feat([TASK-KEY]): <summary>         # Tính năng mới
fix([TASK-KEY]): <summary>          # Sửa bug
refactor([TASK-KEY]): <summary>     # Refactor (không đổi behavior)
chore([TASK-KEY]): <summary>        # Config, setup, CI
test([TASK-KEY]): <summary>         # Thêm/sửa test
```
- **TASK-KEY** = key của parent task (ví dụ: `SCRUM-158`), không dùng subtask key.

---

## 5) DoD (Done)
- [ ] Đã đọc đủ checklist (AGENTS + description + design + clean-code-guide)
- [ ] Jira status đúng: `In Progress` trước khi làm, `In Review` sau khi xong (task & subtasks)
- [ ] Đúng nhánh: từ `sprint/XX` → `feature/[TASK-KEY]`
- [ ] Commit rõ, Conventional Commits, đúng thứ tự subtask
- [ ] Build pass (`npm run build`)
- [ ] Lint pass (`npm run lint` — 0 errors)
- [ ] Test pass (`npm run test`)
- [ ] Feature branch đã push, sẵn sàng review

---

# 🧩 Template mẫu cho Agent (copy/paste)

```markdown
## @Senior_Dev Execution Plan

- Task Key: [SCRUM-XXX]
- Sprint Branch: [sprint/XX]
- Feature Branch: [feature/SCRUM-XXX]
- Task Type: [Small Task | Parent + Subtasks]

### Reading Checklist
- [ ] Root `@AGENTS.md`
- [ ] Working-dir `@AGENTS.md`
- [ ] Jira description (parent/task)
- [ ] Use `jira-mcp` skill to get Comments & Remote Links
- [ ] Design link (if UI)
- [ ] Subtasks read in order (if any)
- [ ] `clean-code-guide.md` + linked/rules docs

### Clarification Gate
- [ ] Clear enough to implement
- [ ] If unclear: commented on the exact task/subtask and STOP

### Jira Status Plan
- [ ] Move parent/task → In Progress (before coding)
- [ ] Move each subtask → In Progress (before coding)
- [ ] Move each done subtask → In Review
- [ ] Move done parent/task → In Review

### Execution Order
1. [Subtask 1 / Step 1]
2. [Subtask 2 / Step 2]
3. ...

### Commit Plan
- Commit 1: [feat(SCRUM-XXX): ...]
- Commit 2: [...]

### Verification
- [ ] `npm run build` pass
- [ ] `npm run lint` — 0 errors
- [ ] `npm run test` pass
- [ ] `git push origin feature/SCRUM-XXX`
```