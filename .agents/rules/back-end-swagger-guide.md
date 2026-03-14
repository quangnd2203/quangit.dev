---
trigger: glob
globs: /back_end/**
---

# Back-end Swagger / OpenAPI Guide

## 1 Nguyên tắc cốt lõi

**BẮT BUỘC:** Mọi API endpoint phải có Swagger decorators đầy đủ **TRƯỚC KHI** merge.

> Swagger UI được mount tại `/api/docs` (xem `src/main.ts`).

---

## 2 Controller-level decorators (bắt buộc)

Mỗi controller phải có `@ApiTags()` để nhóm endpoints trên Swagger UI:

```ts
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {}
```

Nếu controller yêu cầu authentication:

```ts
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@ApiExtraModels(UserResponseDto, ApiErrorResponseDto)  // ← BẮT BUỘC đăng ký tất cả DTO schemas dùng trong controller
export class UsersController {}
```

---

## 3 Method-level decorators (bắt buộc cho mỗi endpoint)

### 3.1 `@ApiOperation` — Mô tả endpoint

```ts
@ApiOperation({
  summary: 'Tóm tắt ngắn (hiện trên UI)',
  description: 'Mô tả chi tiết nếu cần',
})
```

### 3.2 `@ApiResponse` — Mô tả response

**BẮT BUỘC** khai báo ít nhất 2 response: **success** + **error chính**.

> ❌ **CẤM** dùng `schema: { example: {...} }` inline — khó bảo trì, không generate schema đúng cho client SDK.

**Cách đúng — Success response:** dùng `type:` trỏ tới Response DTO:

```ts
@ApiResponse({
  status: 200,
  description: 'User found successfully',
  type: UserResponseDto,  // ← DTO class có @ApiProperty
})
```

**Cách đúng — Error response:** dùng helper factory `apiErrorExample()`:

```ts
import { apiErrorExample, apiValidationErrorExample } from '@common/dto';

// Lỗi 404
@ApiResponse({
  status: 404,
  description: 'User not found',
  ...apiErrorExample(404, 'User with id "uuid" not found', '/users/uuid'),
})

// Lỗi validation 400
@ApiResponse({
  status: 400,
  description: 'Validation failed',
  ...apiValidationErrorExample(
    { email: ['email must be an email'] },
    '/auth/register',
  ),
})
```

### 3.3 `@ApiParam` / `@ApiQuery` — Path params & Query params

```ts
@ApiParam({ name: 'id', description: 'User UUID', example: '550e8400-e29b-41d4-a716-446655440000' })
@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
```

### 3.4 `@ApiBody` — Request body

Dùng `type:` trỏ tới DTO class. ❌ Không dùng `schema: { example: {...} }` inline:

```ts
@ApiBody({ type: CreateUserDto })  // ← đúng
```

---

## 4 DTO decorators (bắt buộc cho request/response DTOs)

### 4.1 Request DTO

Mỗi property trong DTO phải có `@ApiProperty()` hoặc `@ApiPropertyOptional()`:

```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Display name',
    example: 'John Doe',
  })
  username?: string;
}
```

### 4.2 Response DTO

Nếu endpoint trả về object phức tạp, tạo Response DTO:

```ts
export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'user@example.com', nullable: true })
  email!: string | null;
}
```

Sau đó dùng `type` trong `@ApiResponse`:

```ts
@ApiResponse({ status: 200, type: UserResponseDto })
```

---

## 5 Common Error DTOs & Helper Factories

Project cung cấp sẵn DTO classes và helper functions trong `src/common/dto/` để dùng chung toàn app.

### DTO classes (schema)

| Class | Mô tả | Dùng khi |
|-------|-------|----------|
| `ApiErrorResponseDto` | Schema lỗi generic (401, 403, 404, 409...) | `type:` trong `@ApiResponse` hoặc `@ApiExtraModels` |
| `ApiValidationErrorResponseDto` | Schema lỗi validation 400 với per-field errors | `type:` trong `@ApiResponse` hoặc `@ApiExtraModels` |

### Helper factory functions

| Function | Mô tả |
|----------|-------|
| `apiErrorExample(status, message, path)` | Trả về options cho `@ApiResponse` error với example tùy chỉnh per-endpoint |
| `apiValidationErrorExample(errors, path)` | Trả về options cho `@ApiResponse` validation 400 với per-field example |

**Import:**
```ts
import {
  ApiErrorResponseDto,
  ApiValidationErrorResponseDto,
  apiErrorExample,
  apiValidationErrorExample,
} from '@common/dto';
```

**Bắt buộc khai báo `@ApiExtraModels` trên Controller** để Swagger đăng ký schema. Chỉ khai báo những gì controller đó thực sự dùng:

```ts
// Controller có cả error lẫn validation:
@ApiExtraModels(MyResponseDto, ApiErrorResponseDto, ApiValidationErrorResponseDto)

// Controller chỉ có error (không có endpoint nhận input):
@ApiExtraModels(MyResponseDto, ApiErrorResponseDto)
export class MyController {}
```

### Standard response formats

**Success** (do `TransformInterceptor` bọc tự động):
```json
{ "success": true, "data": { /* DTO fields */ }, "timestamp": "ISO-8601" }
```

**Error** (do `HttpExceptionFilter` bọc tự động):
```json
{ "success": false, "error": { "statusCode": 404, "message": "...", "path": "..." }, "timestamp": "ISO-8601" }
```

**Validation error** (400):
```json
{ "success": false, "error": { "statusCode": 400, "message": "Validation failed", "errors": { "email": ["..."] }, "path": "..." }, "timestamp": "ISO-8601" }
```

---

## 6 Common error responses (gợi ý)

| Status | Khi nào | Message mẫu |
|--------|---------|-------------|
| 400 | Validation fail | `"Validation failed"` |
| 401 | Chưa login / token hết hạn | `"Unauthorized"` |
| 403 | Không có quyền | `"Forbidden resource"` |
| 404 | Không tìm thấy resource | `"User with id \"x\" not found"` |
| 409 | Trùng dữ liệu | `"Email already exists"` |
| 500 | Lỗi server | `"Internal server error"` |

---

## 7 Ví dụ hoàn chỉnh (tham khảo)

```ts
import { apiErrorExample, apiValidationErrorExample, ApiErrorResponseDto, ApiValidationErrorResponseDto } from '@common/dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@ApiExtraModels(UserResponseDto, ApiErrorResponseDto, ApiValidationErrorResponseDto)
export class UsersController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    ...apiErrorExample(404, 'User with id "uuid" not found', '/users/uuid'),
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    return { id: user.id, email: user.email /* ... */ };
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created', type: UserResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
    ...apiValidationErrorExample(
      { email: ['email must be an email'], password: ['password is too short'] },
      '/users',
    ),
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    // ...
  }
}
```

---

## 8 Checklist trước khi kết thúc task

- [ ] Mỗi **Controller** có `@ApiTags` và `@ApiExtraModels` khai báo đủ DTO schemas
- [ ] Mỗi **endpoint** có `@ApiOperation` + ít nhất 2 `@ApiResponse` (success + error)
- [ ] **Success response** dùng `type: MyResponseDto` (không dùng `schema: { example: ... }` inline)
- [ ] **Error response** dùng `...apiErrorExample(status, message, path)` từ `@common/dto`
- [ ] **Validation 400** dùng `...apiValidationErrorExample(errors, path)` từ `@common/dto`
- [ ] ❌ **CẤM** dùng `schema: { example: {...} }` inline cho `@ApiResponse`
- [ ] Mỗi **path/query param** có `@ApiParam` / `@ApiQuery`
- [ ] Mỗi **request DTO** property có `@ApiProperty` / `@ApiPropertyOptional`
- [ ] Endpoint cần auth có `@ApiBearerAuth()`
- [ ] Chạy server → vào `/api/docs` → verify endpoint hiển thị đúng schema và example
