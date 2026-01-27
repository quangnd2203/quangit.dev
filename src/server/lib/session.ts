import { randomBytes } from 'crypto';
import { readJsonFile, writeJsonFile } from '@/server/data/jsonStorage';

// File-based session storage
// Sessions are persisted to .data/sessions.json to survive server restarts
interface Session {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

const SESSIONS_FILE = 'sessions.json';

// Session expires after 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000;

/**
 * Load sessions from file
 */
const loadSessions = async (): Promise<Record<string, Session>> => {
  try {
    const sessions = await readJsonFile<Record<string, Session>>(SESSIONS_FILE);
    return sessions || {};
  } catch (error) {
    console.error('Error loading sessions:', error);
    return {};
  }
};

/**
 * Save sessions to file
 */
const saveSessions = async (sessions: Record<string, Session>): Promise<void> => {
  try {
    await writeJsonFile(SESSIONS_FILE, sessions);
  } catch (error) {
    console.error('Error saving sessions:', error);
    throw error;
  }
};

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
    expiresAt: now + SESSION_DURATION,
  };
  
  // Load existing sessions
  const sessions = await loadSessions();
  
  // Add new session
  sessions[token] = session;
  
  // Save to file
  await saveSessions(sessions);
  
  return token;
};

/**
 * Verify if a session token is valid
 */
export const verifySession = async (token: string): Promise<boolean> => {
  if (!token) return false;
  
  // Load sessions from file
  const sessions = await loadSessions();
  const session = sessions[token];
  
  if (!session) return false;
  
  // Check if session has expired
  const now = Date.now();
  if (now > session.expiresAt) {
    // Remove expired session
    delete sessions[token];
    await saveSessions(sessions);
    return false;
  }
  
  return true;
};

/**
 * Clear a session
 */
export const clearSession = async (token: string): Promise<void> => {
  if (!token) return;
  
  // Load sessions from file
  const sessions = await loadSessions();
  
  // Remove session
  if (sessions[token]) {
    delete sessions[token];
    await saveSessions(sessions);
  }
};

/**
 * Clean up expired sessions (can be called periodically)
 */
export const cleanupExpiredSessions = async (): Promise<void> => {
  const now = Date.now();
  const sessions = await loadSessions();
  
  let hasChanges = false;
  for (const [token, session] of Object.entries(sessions)) {
    if (now > session.expiresAt) {
      delete sessions[token];
      hasChanges = true;
    }
  }
  
  // Only save if there were changes
  if (hasChanges) {
    await saveSessions(sessions);
  }
};
