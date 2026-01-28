# Migration Plan: File Storage → Upstash Redis

## Mục tiêu
Chuyển từ file-based storage sang Upstash Redis để tương thích với Vercel serverless environment.

## Dữ liệu cần migrate

### 1. Đã có (đang dùng file storage)
- ✅ **Sessions** (`sessions.json`) - Admin authentication
- ✅ **Personal Info** (`personal-info.json`) - Thông tin cá nhân
- ✅ **Skills** (`skills.json`) - Technical skills và categories

### 2. Cần tạo mới (hiện dùng mock data)
- ⚠️ **Projects** - Portfolio projects (cần tạo API + admin)
- ⚠️ **Experiences** - Work experience (cần tạo API + admin)

### 3. Tương lai
- 📋 **Contact Messages** - Form submissions
- 📋 **Blog Posts** - Blog content

## Giải pháp: Upstash Redis

### Lý do chọn
- ✅ Persistent storage (không mất data khi restart)
- ✅ Tương thích serverless (Vercel)
- ✅ Free tier: 10,000 commands/day, 256MB
- ✅ Fast (Redis)
- ✅ Dễ migrate từ file-based

### Key Structure trong Redis
```
sessions:{token}          → Session data (TTL: 24h)
personal-info             → PersonalInfo JSON
skills                    → SkillCategory[] JSON
projects                  → Project[] JSON
experiences               → Experience[] JSON
contact-messages:{id}     → ContactMessage JSON (future)
blog-posts:{id}           → BlogPost JSON (future)
```

## Implementation Steps

### Phase 1: Setup Upstash Redis

1. **Tạo Upstash database trên Vercel**
   - Vào Vercel Dashboard → Storage → Add → Upstash Redis
   - Copy connection credentials

2. **Add environment variables**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - Add vào `.env.local` và Vercel environment variables

3. **Install package**
   ```bash
   npm install @upstash/redis
   ```

### Phase 2: Create Redis Storage Layer

**File:** `src/server/data/redisStorage.ts` (NEW)
- Implement `readJsonFile` và `writeJsonFile` với Redis
- Giữ nguyên interface để dễ migrate
- Support TTL cho sessions

### Phase 3: Refactor Storage Layer

**File:** `src/server/data/jsonStorage.ts`
- Option 1: Thay thế hoàn toàn bằng Redis
- Option 2: Conditional logic (Redis trên production, file trên local)
- **Recommendation:** Option 2 để dễ test local

### Phase 4: Migrate Existing Data

1. **Sessions** (`src/server/lib/session.ts`)
   - Update `loadSessions()` → `redis.get('sessions:{token}')`
   - Update `saveSessions()` → `redis.setex('sessions:{token}', ttl, data)`
   - Sessions cần TTL (24 hours)

2. **Personal Info** (`src/server/api/admin/personal-info.ts`)
   - Key: `personal-info`
   - No TTL (permanent)

3. **Skills** (`src/server/api/admin/skills.ts`)
   - Key: `skills`
   - No TTL (permanent)

### Phase 5: Create Projects & Experiences APIs

**Tạo tương tự như personal-info và skills:**

1. **Projects**
   - `src/server/api/admin/projects.ts` - Server functions
   - `src/app/api/admin/projects/route.ts` - API route (GET public, PUT protected)
   - `src/features/admin/hooks/useProjectsAdmin.ts` - Admin hook
   - `src/features/admin/components/ProjectsForm.tsx` - Admin form
   - `src/app/admin/projects/page.tsx` - Admin page

2. **Experiences**
   - `src/server/api/admin/experiences.ts` - Server functions
   - `src/app/api/admin/experiences/route.ts` - API route (GET public, PUT protected)
   - `src/features/admin/hooks/useExperiencesAdmin.ts` - Admin hook
   - `src/features/admin/components/ExperiencesForm.tsx` - Admin form
   - `src/app/admin/experiences/page.tsx` - Admin page

### Phase 6: Update Repositories

**Update repositories để dùng API thay vì mock data:**

1. **ProjectRepository** (`src/infrastructure/repositories/ProjectRepository.ts`)
   - Fetch từ `/api/admin/projects` (GET)

2. **ExperienceRepository** (`src/infrastructure/repositories/ExperienceRepository.ts`)
   - Fetch từ `/api/admin/experiences` (GET)

## Code Structure

### Redis Storage Implementation

```typescript
// src/server/data/redisStorage.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const readJsonFile = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redis.get<T>(key);
    return data;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
};

export const writeJsonFile = async <T>(
  key: string, 
  data: T, 
  ttlSeconds?: number
): Promise<void> => {
  try {
    if (ttlSeconds) {
      await redis.setex(key, ttlSeconds, data);
    } else {
      await redis.set(key, data);
    }
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
    throw error;
  }
};
```

### Conditional Storage (Local vs Production)

```typescript
// src/server/data/jsonStorage.ts
import { readJsonFile as readRedis, writeJsonFile as writeRedis } from './redisStorage';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const USE_REDIS = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
const DATA_DIR = join(process.cwd(), '.data');

// File-based (local development)
const readFileStorage = async <T>(filename: string): Promise<T | null> => {
  try {
    const filePath = join(DATA_DIR, filename);
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

const writeFileStorage = async <T>(filename: string, data: T): Promise<void> => {
  await mkdir(DATA_DIR, { recursive: true });
  const filePath = join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Public API (switches between Redis and file)
export const readJsonFile = async <T>(key: string): Promise<T | null> => {
  if (USE_REDIS) {
    return readRedis<T>(key);
  }
  return readFileStorage<T>(key);
};

export const writeJsonFile = async <T>(
  key: string, 
  data: T, 
  ttlSeconds?: number
): Promise<void> => {
  if (USE_REDIS) {
    return writeRedis(key, data, ttlSeconds);
  }
  return writeFileStorage(key, data);
};
```

### Session Storage với TTL

```typescript
// src/server/lib/session.ts
import { createSession, verifySession, clearSession } from './session';

// Update createSession để dùng TTL
export const createSession = async (userId: string): Promise<string> => {
  const token = randomBytes(32).toString('hex');
  const now = Date.now();
  const session: Session = {
    token,
    userId,
    createdAt: now,
    expiresAt: now + SESSION_DURATION,
  };
  
  // Save với TTL (24 hours = 86400 seconds)
  await writeJsonFile(`sessions:${token}`, session, 86400);
  
  return token;
};

// Update verifySession
export const verifySession = async (token: string): Promise<boolean> => {
  if (!token) return false;
  
  const session = await readJsonFile<Session>(`sessions:${token}`);
  if (!session) return false;
  
  const now = Date.now();
  if (now > session.expiresAt) {
    await clearSession(token);
    return false;
  }
  
  return true;
};

// Update clearSession
export const clearSession = async (token: string): Promise<void> => {
  if (!token) return;
  // Redis: delete key
  // File: load all, delete, save (hoặc implement delete function)
};
```

## Migration Checklist

### Setup
- [ ] Tạo Upstash Redis database trên Vercel
- [ ] Add env variables (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)
- [ ] Install `@upstash/redis`

### Storage Layer
- [ ] Tạo `src/server/data/redisStorage.ts`
- [ ] Update `src/server/data/jsonStorage.ts` với conditional logic
- [ ] Test read/write trên local và production

### Migrate Existing
- [ ] Update `src/server/lib/session.ts` (sessions với TTL)
- [ ] Update `src/server/api/admin/personal-info.ts` (key: `personal-info`)
- [ ] Update `src/server/api/admin/skills.ts` (key: `skills`)

### Create New APIs
- [ ] Tạo `src/server/api/admin/projects.ts`
- [ ] Tạo `src/app/api/admin/projects/route.ts`
- [ ] Tạo `src/features/admin/hooks/useProjectsAdmin.ts`
- [ ] Tạo `src/features/admin/components/ProjectsForm.tsx`
- [ ] Tạo `src/app/admin/projects/page.tsx`
- [ ] Tạo `src/server/api/admin/experiences.ts`
- [ ] Tạo `src/app/api/admin/experiences/route.ts`
- [ ] Tạo `src/features/admin/hooks/useExperiencesAdmin.ts`
- [ ] Tạo `src/features/admin/components/ExperiencesForm.tsx`
- [ ] Tạo `src/app/admin/experiences/page.tsx`

### Update Repositories
- [ ] Update `ProjectRepository` để fetch từ API
- [ ] Update `ExperienceRepository` để fetch từ API

### Testing
- [ ] Test sessions (login/logout/verify)
- [ ] Test personal-info (GET/PUT)
- [ ] Test skills (GET/PUT)
- [ ] Test projects (GET/PUT) - sau khi tạo
- [ ] Test experiences (GET/PUT) - sau khi tạo
- [ ] Test trên local (file storage)
- [ ] Test trên Vercel (Redis storage)

## Notes

- **TTL cho sessions**: 24 hours (86400 seconds)
- **No TTL cho data**: personal-info, skills, projects, experiences (permanent)
- **Key naming**: Dùng `:` separator cho namespacing (Redis convention)
- **Fallback**: File storage trên local nếu không có Redis env vars
- **Migration data**: Có thể cần script để migrate existing file data → Redis (nếu có)
