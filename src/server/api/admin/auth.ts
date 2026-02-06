import { createSession, clearSession, verifySession } from '@/server/lib/session';

// Constant-time string comparison to prevent timing attacks
const constantTimeCompare = (a: string, b: string): boolean => {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
};

/**
 * Verify email against environment variable
 */
export const verifyEmail = (email: string): boolean => {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
        console.error('ADMIN_EMAIL environment variable is not set');
        return false;
    }

    // Case-insensitive comparison with trimmed values
    return email.toLowerCase().trim() === adminEmail.toLowerCase().trim();
};

/**
 * Verify password against environment variable
 */
export const verifyPassword = (password: string): boolean => {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable is not set');
        return false;
    }

    return constantTimeCompare(password, adminPassword);
};

/**
 * Login with email and password, returns session token if successful
 */
export const login = async (
    email: string,
    password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
    if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
    }

    if (!verifyEmail(email)) {
        return { success: false, error: 'Invalid credentials' };
    }

    if (!verifyPassword(password)) {
        return { success: false, error: 'Invalid credentials' };
    }

    // Create session with userId 'admin'
    const token = await createSession('admin');

    return { success: true, token };
};

/**
 * Logout by clearing the session
 */
export const logout = async (token: string): Promise<void> => {
    if (token) {
        await clearSession(token);
    }
};
