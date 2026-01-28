# Redis Setup Guide

This project uses Redis for data storage with Docker for local development and Upstash Redis for production on Vercel.

## Local Development Setup

### 1. Start Docker Redis

```bash
npm run docker:up
```

This will start a Redis container on `localhost:6379` with persistent data storage.

### 2. Configure Environment Variables

Create `.env.local` file (copy from `.env.example`):

```bash
# Admin Panel Credentials
ADMIN_EMAIL=admin@quangit.dev
ADMIN_PASSWORD=your-password-here

# Redis Configuration (Local)
REDIS_URL=redis://localhost:6379
```

### 3. Install Dependencies

```bash
npm install
```

This will install both `ioredis` (for Docker Redis) and `@upstash/redis` (for Upstash).

### 4. Start Development Server

```bash
npm run dev
```

## Production Setup (Vercel)

### 1. Create Upstash Redis Database

1. Go to Vercel Dashboard → Storage → Add → Upstash Redis
2. Create a new database
3. Copy the connection credentials:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 2. Add Environment Variables to Vercel

In Vercel project settings → Environment Variables, add:

- `UPSTASH_REDIS_REST_URL` (from Upstash dashboard)
- `UPSTASH_REDIS_REST_TOKEN` (from Upstash dashboard)

### 3. Deploy

The application will automatically use Upstash Redis when these environment variables are set.

## How It Works

### Storage Layer

The application uses a conditional storage layer:

- **If Redis is configured** (via `REDIS_URL` or `UPSTASH_REDIS_REST_URL`): Uses Redis
- **If Redis is not configured**: Falls back to file-based storage (`.data/` directory)

### Key Structure

- `sessions:{token}` → Session data (TTL: 24 hours)
- `personal-info` → PersonalInfo JSON (no TTL)
- `skills` → SkillCategory[] JSON (no TTL)
- `projects` → Project[] JSON (no TTL - future)
- `experiences` → Experience[] JSON (no TTL - future)

### Client Selection

- **Local**: Uses `ioredis` with Docker Redis (TCP connection)
- **Production**: Uses `@upstash/redis` with Upstash REST API (HTTP-based, serverless-friendly)

## Docker Commands

```bash
# Start Redis container
npm run docker:up

# Stop Redis container
npm run docker:down

# View Redis logs
npm run docker:logs
```

## Migration Notes

- Existing file-based data (`.data/` directory) will continue to work if Redis is not configured
- When Redis is configured, new data will be stored in Redis
- To migrate existing data, you can manually copy from `.data/` files to Redis keys

## Troubleshooting

### Redis connection errors

- **Local**: Make sure Docker Redis is running (`npm run docker:up`)
- **Production**: Verify Upstash environment variables are set correctly in Vercel

### Fallback to file storage

If Redis is not available, the application will automatically fall back to file storage. Check console logs for warnings.
