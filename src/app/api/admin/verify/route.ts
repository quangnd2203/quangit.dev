import { NextResponse } from 'next/server';
import { verifyAuth } from '@/server/api/middleware';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  try {
    const authResult = await verifyAuth(request);
    
    return NextResponse.json(
      { authenticated: authResult.authenticated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
};
