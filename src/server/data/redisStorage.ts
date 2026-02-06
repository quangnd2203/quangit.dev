import { getRedisClient } from './redisClient';
import Redis from 'ioredis';
import { Redis as UpstashRedis } from '@upstash/redis';

/**
 * Check if client is ioredis instance
 */
const isIoredis = (client: Redis | UpstashRedis): client is Redis => {
    return 'get' in client && typeof (client as Redis).get === 'function' && 'setex' in client;
};

/**
 * Read JSON data from Redis
 */
export const readJsonFile = async <T>(key: string): Promise<T | null> => {
    try {
        const redis = getRedisClient();
        let data: string | null;

        if (isIoredis(redis)) {
            // ioredis (Docker Redis)
            data = await redis.get(key);
        } else {
            // @upstash/redis (Upstash REST API)
            data = (await redis.get(key)) as string | null;
        }

        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error reading ${key}:`, error);
        return null;
    }
};

/**
 * Write JSON data to Redis
 * @param key Redis key
 * @param data Data to store (will be JSON stringified)
 * @param ttlSeconds Optional TTL in seconds (for sessions)
 */
export const writeJsonFile = async <T>(
    key: string,
    data: T,
    ttlSeconds?: number
): Promise<void> => {
    try {
        const redis = getRedisClient();
        const serialized = JSON.stringify(data);

        if (isIoredis(redis)) {
            // ioredis (Docker Redis)
            if (ttlSeconds) {
                await redis.setex(key, ttlSeconds, serialized);
            } else {
                await redis.set(key, serialized);
            }
        } else {
            // @upstash/redis (Upstash REST API)
            if (ttlSeconds) {
                await redis.set(key, serialized, { ex: ttlSeconds });
            } else {
                await redis.set(key, serialized);
            }
        }
    } catch (error) {
        console.error(`Error writing ${key}:`, error);
        throw error;
    }
};

/**
 * Delete a key from Redis
 */
export const deleteKey = async (key: string): Promise<void> => {
    try {
        const redis = getRedisClient();
        await redis.del(key);
    } catch (error) {
        console.error(`Error deleting ${key}:`, error);
        throw error;
    }
};
