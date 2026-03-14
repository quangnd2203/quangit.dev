---
trigger: always_on
---

# Clean Code Guide

## 1 Nguyên tắc cốt lõi

### 1.1 Test-Driven Development (TDD)
**BẮT BUỘC:** Viết unit test TRƯỚC KHI viết implementation.

**Quy trình:**
1. Viết test case mô tả expected behavior (test sẽ fail - RED).
2. Viết code tối thiểu để pass test (GREEN).
3. Refactor code giữ nguyên test pass (REFACTOR).

**Ví dụ workflow:**
```ts
// 1. Viết test TRƯỚC (fen.test.ts)
describe('parseFEN', () => {
  it('should parse standard starting position', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const result = parseFEN(fen);
    expect(result.board[0]).toEqual({ type: 'r', color: 'b' });
  });
});

// 2. Viết implementation SAU (fen.ts)
export function parseFEN(fen: string): BoardState {
  // Implementation here
}
```

**Ngoại lệ:** Chỉ được viết code trước test khi:
- Spike/prototype để khám phá API của thư viện mới (phải xóa sau khi hiểu).
- Refactor code đã có test coverage đầy đủ.

---

## 2 Quy tắc về độ phức tạp

### 2.1 Cyclomatic Complexity
- **Giới hạn:** Mỗi hàm không được vượt quá **10 nhánh logic** (if/else/switch/loop/ternary).
- **Công cụ kiểm tra:** ESLint `complexity` rule (đã config trong project).
- **Xử lý khi vượt:** Tách thành nhiều hàm nhỏ hơn với tên rõ ràng.

**Ví dụ SAI:**
```ts
// ❌ Quá nhiều nhánh (complexity > 10)
function validateMove(move: Move, board: Board): boolean {
  if (move.piece === 'p') {
    if (move.from.rank === 1 && move.to.rank === 3) {
      if (board[move.to.file][move.to.rank] === null) {
        return true;
      }
    } else if (move.to.rank - move.from.rank === 1) {
      // ... more nested conditions
    }
  } else if (move.piece === 'n') {
    // ... knight logic
  }
  // ... more pieces
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Tách thành các hàm nhỏ
function validateMove(move: Move, board: Board): boolean {
  switch (move.piece) {
    case 'p': return validatePawnMove(move, board);
    case 'n': return validateKnightMove(move, board);
    case 'b': return validateBishopMove(move, board);
    // ...
    default: return false;
  }
}

function validatePawnMove(move: Move, board: Board): boolean {
  if (isDoublePawnPush(move)) {
    return isPathClear(move, board);
  }
  return isSinglePawnPush(move, board);
}
```

### 2.2 Nesting Depth
- **Giới hạn:** Không lồng quá **3 cấp** (if/for/while).
- **Xử lý:** Dùng early return, guard clauses, hoặc tách hàm.

**Ví dụ SAI:**
```ts
// ❌ Lồng 4 cấp
function processBoard(board: Board) {
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file]) {
        if (board[rank][file].color === 'w') {
          // ... logic
        }
      }
    }
  }
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Early return + helper function
function processBoard(board: Board) {
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (!piece) continue;
      
      processPiece(piece, rank, file);
    }
  }
}

function processPiece(piece: Piece, rank: number, file: number) {
  if (piece.color !== 'w') return;
  // ... logic
}
```

### 2.3 Function Length
- **Giới hạn:** Mỗi hàm không quá **50 dòng** (không tính comment/blank lines).
- **Lý do:** Hàm dài = khó hiểu, khó test, khó maintain.
- **Xử lý:** Tách thành nhiều hàm với Single Responsibility.

---

## 3 Quy tắc về hàm

### 3.1 Naming
- **Động từ + Danh từ:** `calculateScore`, `validateMove`, `parseFEN`, `generateBoard`.
- **Boolean:** Prefix `is`, `has`, `should`, `can` → `isValidMove`, `hasKingInCheck`.
- **Tránh:** Tên chung chung (`process`, `handle`, `do`, `manage`).

### 3.2 Parameters
- **Giới hạn:** Không quá **3 parameters**.
- **Nếu cần nhiều hơn:** Dùng object parameter.

**Ví dụ SAI:**
```ts
// ❌ Quá nhiều params
function createPiece(type: PieceType, color: PieceColor, rank: number, file: number, hasMoved: boolean) {
  // ...
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Object parameter
interface CreatePieceParams {
  type: PieceType;
  color: PieceColor;
  position: { rank: number; file: number };
  hasMoved?: boolean;
}

function createPiece(params: CreatePieceParams): Piece {
  // ...
}
```

### 3.3 JSDoc Comments
**BẮT BUỘC** cho mọi exported function/class/type.

**Format chuẩn:**
```ts
/**
 * Parses FEN notation string into BoardState object.
 * 
 * @param fen - FEN string (e.g., "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
 * @returns Parsed board state with pieces, turn, castling rights, etc.
 * @throws {Error} If FEN format is invalid
 * 
 * @example
 * ```ts
 * const board = parseFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
 * console.log(board.activeColor); // 'w'
 * ```
 */
export function parseFEN(fen: string): BoardState {
  // ...
}
```

**Bắt buộc có:**
- `@param` cho mỗi parameter (kể cả object properties nếu phức tạp).
- `@returns` mô tả output.
- `@throws` nếu có exception.
- `@example` nếu usage không tự nhiên.

### 3.4 Pure Functions
**Ưu tiên** pure functions (không side effects, không mutate input).

**Ví dụ SAI:**
```ts
// ❌ Mutate input
function applyMove(board: Board, move: Move): void {
  board[move.to.rank][move.to.file] = board[move.from.rank][move.from.file];
  board[move.from.rank][move.from.file] = null;
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Return new board
function applyMove(board: Board, move: Move): Board {
  const newBoard = cloneBoard(board);
  newBoard[move.to.rank][move.to.file] = newBoard[move.from.rank][move.from.file];
  newBoard[move.from.rank][move.from.file] = null;
  return newBoard;
}
```

---

## 4 CẤM đệ quy

**Lý do:**
- Khó debug (stack trace phức tạp).
- Rủi ro stack overflow.
- Performance kém hơn iteration trong JS.
- Khó test edge cases.

**Thay thế:** Dùng iteration (for/while) hoặc stack/queue data structure.

**Ví dụ SAI:**
```ts
// ❌ Đệ quy
function findAllMoves(board: Board, depth: number): Move[] {
  if (depth === 0) return [];
  const moves = getLegalMoves(board);
  return moves.concat(
    moves.flatMap(move => findAllMoves(applyMove(board, move), depth - 1))
  );
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Iteration với stack
function findAllMoves(board: Board, maxDepth: number): Move[] {
  const stack: Array<{ board: Board; depth: number }> = [{ board, depth: 0 }];
  const allMoves: Move[] = [];

  while (stack.length > 0) {
    const { board: currentBoard, depth } = stack.pop()!;
    if (depth >= maxDepth) continue;

    const moves = getLegalMoves(currentBoard);
    allMoves.push(...moves);

    for (const move of moves) {
      stack.push({ board: applyMove(currentBoard, move), depth: depth + 1 });
    }
  }

  return allMoves;
}
```

**Ngoại lệ:** Chỉ được dùng đệ quy khi:
- Thuật toán vốn dĩ là đệ quy (tree traversal, graph DFS) VÀ depth bị giới hạn chặt chẽ (< 100).
- Phải có unit test coverage cho max depth case.

---

## 5 Type Safety

### 5.1 TypeScript Strict Mode
- **Bắt buộc:** `strict: true` trong `tsconfig.json` (đã config).
- **Không dùng:** `any`, `as any`, `@ts-ignore` (trừ khi integrate thư viện không có types).

### 5.2 Explicit Return Types
**BẮT BUỘC** khai báo return type cho exported functions.

**Ví dụ SAI:**
```ts
// ❌ Implicit return type
export function calculateScore(board: Board) {
  return board.reduce((sum, piece) => sum + (piece?.value ?? 0), 0);
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Explicit return type
export function calculateScore(board: Board): number {
  return board.reduce((sum, piece) => sum + (piece?.value ?? 0), 0);
}

### 5.3 No Dynamic/Inline Type Imports
**CẤM:** Sử dụng `import()` trực tiếp trong khai báo kiểu (inline type import).

**Lý do:**
- Khó đọc, làm rối signature của hàm.
- Thiếu đồng nhất (inconsistency) với phần còn lại của dự án.
- Khó bảo trì khi cần dùng lại kiểu đó ở nhiều nơi.

**Ví dụ SAI:**
```ts
// ❌ Inline type import
export async function validateUser(email: string): Promise<import('@prisma/client').User> {
  // ...
}
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Dùng Static Import ở đầu file
import type { User } from '@prisma/client';

export async function validateUser(email: string): Promise<User> {
  // ...
}
```
```

---

## 6 Error Handling

### 6.1 Validation
- **Domain layer:** Throw Error với message rõ ràng.
- **Presentation layer:** Catch và hiển thị user-friendly message.

**Ví dụ:**
```ts
// Domain layer
export function parseFEN(fen: string): BoardState {
  if (!fen || typeof fen !== 'string') {
    throw new Error('FEN must be a non-empty string');
  }
  
  const parts = fen.trim().split(/\s+/);
  if (parts.length !== 6) {
    throw new Error(`Invalid FEN: Expected 6 fields, got ${parts.length}`);
  }
  
  // ...
}

// Presentation layer
function useFENParser() {
  const [error, setError] = useState<string | null>(null);
  
  const parse = (fen: string) => {
    try {
      return parseFEN(fen);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid FEN format');
      return null;
    }
  };
  
  return { parse, error };
}
```

### 6.2 Defensive Programming
- **Validate inputs** ở đầu hàm.
- **Dùng guard clauses** thay vì nested if.

---

## 7 Code Organization

### 7.1 Single Responsibility
Mỗi file/function/class chỉ làm **MỘT việc**.

**Ví dụ SAI:**
```ts
// ❌ File làm quá nhiều việc
// fen.ts
export function parseFEN(fen: string): BoardState { /* ... */ }
export function generateFEN(board: BoardState): string { /* ... */ }
export function validateFEN(fen: string): boolean { /* ... */ }
export function convertToChessJS(board: BoardState): ChessJSBoard { /* ... */ }
```

**Ví dụ ĐÚNG:**
```ts
// ✅ Tách thành nhiều files
// fen/parser.ts
export function parseFEN(fen: string): BoardState { /* ... */ }

// fen/generator.ts
export function generateFEN(board: BoardState): string { /* ... */ }

// fen/validator.ts
export function validateFEN(fen: string): boolean { /* ... */ }

// adapters/chessJsAdapter.ts
export function convertToChessJS(board: BoardState): ChessJSBoard { /* ... */ }
```

### 7.2 Barrel Exports
Dùng `index.ts` để export public API.

```ts
// domain/board/index.ts
export { parseFEN } from './fen/parser';
export { generateFEN } from './fen/generator';
export type { BoardState, Piece, PieceType } from './types';
```

---

## 8 Checklist trước khi commit

- [ ] **Test viết TRƯỚC code** (TDD).
- [ ] **JSDoc đầy đủ** cho exported functions.
- [ ] **Cyclomatic complexity ≤ 10** (check ESLint).
- [ ] **Nesting depth ≤ 3**.
- [ ] **Function length ≤ 50 dòng**.
- [ ] **Không có đệ quy** (trừ ngoại lệ có document).
- [ ] **Explicit return types** cho exported functions.
- [ ] **Không dùng dynamic/inline type imports** (dùng static import).
- [ ] **No `any`, `@ts-ignore`** (trừ thư viện external).
- [ ] **Test coverage ≥ 80%** cho domain/application logic.
- [ ] **`npm run build`** pass.
- [ ] **`npm run lint`** pass.
- [ ] **`npm run test`** pass.

---

## 9 Enforcement

- **ESLint rules:**
  - `complexity: ["error", 10]`
  - `max-depth: ["error", 3]`
  - `max-lines-per-function: ["error", 50]`
  - `@typescript-eslint/explicit-function-return-type: "error"`

- **Pre-commit hooks:** Husky + lint-staged (sẽ setup trong Sprint 0).

- **Code review:** Tech Lead/Senior Dev sẽ reject PR vi phạm rules này.
