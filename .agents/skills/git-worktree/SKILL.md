---
name: git-worktree
description: Skill quản lý Git Worktree cho từng Task. Mỗi task chạy trong worktree riêng biệt (ví dụ /worktrees/scrum-141), cho phép nhiều agent/session xử lý song song mà không xung đột file.
---

# Git Worktree Skill

Bạn dùng **Git Worktree** để tạo không gian làm việc cô lập cho mỗi task. Thay vì `git checkout` qua lại giữa các branch trên cùng thư mục, mỗi task sẽ có thư mục riêng tại `<repo-root>/worktrees/<task-key-lowercase>`.

## Lợi ích

- **Chạy song song:** Nhiều agent/session có thể làm song song mà không conflict file.
- **Không mất context:** Branch chính (`sprint/XX`) vẫn nguyên vẹn khi dev feature.
- **Build/test độc lập:** Mỗi worktree có `node_modules` riêng.
- **Cleanup dễ:** Xóa worktree khi task merged.

## Khi nào dùng

- Bắt đầu làm task mới (SCRUM-XXX, TECHDEBT-XXX…).
- Cần chạy song song nhiều task (multi-agent).
- Muốn tách biệt hoàn toàn working directory giữa các feature.

## Quy trình

### Bước 1: Tạo Worktree cho Task

```bash
# Đứng tại repo gốc
cd <REPO_ROOT>

# Lấy task key (ví dụ: SCRUM-141 → scrum-141)
TASK_KEY="scrum-141"
BRANCH_NAME="feature/SCRUM-141"
WORKTREE_DIR="worktrees/${TASK_KEY}"

# Đảm bảo base branch mới nhất
git fetch origin

# Tạo branch + worktree cùng lúc
git worktree add -b "${BRANCH_NAME}" "${WORKTREE_DIR}" origin/sprint/05
```

> ⚠️ Nếu branch đã tồn tại: `git worktree add "${WORKTREE_DIR}" "${BRANCH_NAME}"`

### Bước 2: Cài Dependencies

```bash
cd "${WORKTREE_DIR}"

# Frontend
cd front_end && npm install && cd ..

# Backend (nếu cần)
cd back_end && npm install && cd ..
```

### Bước 3: Làm việc trong Worktree

Từ đây, **MỌI thao tác** (code, build, test, commit, push) đều chạy **trong thư mục worktree**:

```bash
cd <REPO_ROOT>/worktrees/${TASK_KEY}

# Ví dụ: chạy build frontend
cd front_end && npm run build

# Ví dụ: chạy test
npm run test

# Ví dụ: commit
git add .
git commit -m "feat(SCRUM-141): implement feature X"
git push origin feature/SCRUM-141
```

### Bước 4: Cleanup sau khi Merge

Khi task đã merge vào base branch:

```bash
# Quay về repo gốc
cd <REPO_ROOT>

# Xóa worktree
git worktree remove worktrees/${TASK_KEY}

# (Optional) Xóa remote branch
git push origin --delete feature/SCRUM-141
```

## Cấu trúc thư mục

```
chess_project/                    ← Repo gốc (sprint/05)
├── front_end/
├── back_end/
├── worktrees/                    ← Thư mục chứa worktrees
│   ├── scrum-141/                ← Worktree cho SCRUM-141
│   │   ├── front_end/
│   │   └── back_end/
│   ├── scrum-158/                ← Worktree cho SCRUM-158
│   │   ├── front_end/
│   │   └── back_end/
│   └── ...
└── .git/
```

## Lưu ý quan trọng

### 1. Gitignore
Thêm `worktrees/` vào `.gitignore` của repo gốc để tránh track:

```gitignore
# Git worktrees
worktrees/
```

### 2. Không dùng chung node_modules
Mỗi worktree phải `npm install` riêng — KHÔNG symlink `node_modules`.

### 3. Port conflict
Nếu chạy dev server ở nhiều worktree cùng lúc, đổi port:

```bash
# Worktree 1
PORT=3000 npm run dev

# Worktree 2
PORT=3001 npm run dev
```

### 4. Kiểm tra worktree hiện có

```bash
git worktree list
```

### 5. Base branch
Luôn tạo worktree từ **base branch mới nhất** (thường là `sprint/XX` hoặc `main`). Ví dụ dùng `origin/sprint/05`.

## Tích hợp với workflow khác

Khi dùng git-worktree với các workflow khác (`/06`, `/07`):

1. **`/06` (Feature Dev):** Thay vì `git checkout -b feature/SCRUM-XXX`, dùng `git worktree add` → phần còn lại workflow giữ nguyên.
2. **`/07` (Code Review):** @Tech_Lead đọc code bình thường — code nằm trong worktree nhưng vẫn push lên cùng remote.
3. **Multi-agent:** Mỗi agent session nhận 1 task key → tạo worktree riêng → làm việc song song, zero conflict.
