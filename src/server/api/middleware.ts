import { verifySession } from '@/server/lib/session';

/**
 * Extract session token from request (cookie or Authorization header)
 */
const extractToken = (request: Request): string | null => {
  // Try to get token from cookie first
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    if (cookies['admin-session']) {
      return cookies['admin-session'];
    }
  }
  
  // Fallback to Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
};

/**
 * Verify authentication status from request
 */
export const verifyAuth = async (request: Request): Promise<{ authenticated: boolean; token?: string }> => {
  const token = extractToken(request);
  
  if (!token) {
    return { authenticated: false };
  }
  
  const isValid = await verifySession(token);
  
  if (!isValid) {
    return { authenticated: false };
  }
  
  return { authenticated: true, token };
};
