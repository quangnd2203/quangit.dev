import { NextResponse } from 'next/server';
import { verifyAuth } from '@/server/api/middleware';
import { updateProjects } from '@/server/api/admin/projects';
import { mockProjects } from '@/shared/data/projects';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
  try {
    // Check authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Migrate mock projects to Redis
    const migrated = await updateProjects(mockProjects);

    return NextResponse.json(
      { 
        message: 'Projects migrated successfully',
        count: migrated.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Migrate projects error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
};
