import Redis from 'ioredis';
import { Redis as UpstashRedis } from '@upstash/redis';

type RedisClient = Redis | UpstashRedis;

let redisClient: RedisClient | null = null;

/**
 * Get Redis client instance (singleton)
 * Supports both Docker Redis (local) and Upstash Redis (production)
 */
export const getRedisClient = (): RedisClient => {
    if (redisClient) return redisClient;

    // Production: Upstash Redis (REST API)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redisClient = new UpstashRedis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    }
    // Local: Docker Redis
    else if (process.env.REDIS_URL) {
        redisClient = new Redis(process.env.REDIS_URL);
    } else {
        throw new Error('Redis configuration not found. Set REDIS_URL or UPSTASH_REDIS_REST_URL');
    }

    return redisClient;
};
