import { NextResponse } from 'next/server';
import { logout } from '@/server/api/admin/auth';
import { verifyAuth } from '@/server/api/middleware';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  try {
    // Get token from request
    const authResult = await verifyAuth(request);
    
    if (authResult.token) {
      // Clear session
      await logout(authResult.token);
    }
    
    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );
    
    // Clear cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
