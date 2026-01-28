import { randomBytes } from 'crypto';
import { readJsonFile, writeJsonFile, deleteKey } from '@/server/data/redisStorage';

interface Session {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

// Session expires after 24 hours (in seconds for Redis TTL)
const SESSION_DURATION_SECONDS = 24 * 60 * 60;

/**
 * Create a new session and return the token
 */
export const createSession = async (userId: string): Promise<string> => {
  // Generate secure random token
  const token = randomBytes(32).toString('hex');
  
  const now = Date.now();
  const session: Session = {
    token,
    userId,
    createdAt: now,
    expiresAt: now + (SESSION_DURATION_SECONDS * 1000),
  };
  
  // Save session with TTL (Redis will auto-expire)
  await writeJsonFile(`sessions:${token}`, session, SESSION_DURATION_SECONDS);
  
  return token;
};

/**
 * Verify if a session token is valid
 */
export const verifySession = async (token: string): Promise<boolean> => {
  if (!token) return false;
  
  // Load session (Redis TTL handles expiration automatically)
  const session = await readJsonFile<Session>(`sessions:${token}`);
  
  if (!session) return false;
  
  // Double-check expiration
  const now = Date.now();
  if (now > session.expiresAt) {
    // Remove expired session
    await deleteKey(`sessions:${token}`);
    return false;
  }
  
  return true;
};

/**
 * Clear a session
 */
export const clearSession = async (token: string): Promise<void> => {
  if (!token) return;
  await deleteKey(`sessions:${token}`);
};

/**
 * Clean up expired sessions
 * Note: Redis TTL handles expiration automatically, so this function is mainly for manual cleanup if needed
 */
export const cleanupExpiredSessions = async (): Promise<void> => {
  // Redis TTL handles expiration automatically
  // This function is kept for compatibility but does nothing
  // If manual cleanup is needed, it would require scanning all session keys, which is not efficient
};
