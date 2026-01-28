import { NextResponse } from 'next/server';
import { getProjects, updateProjects } from '@/server/api/admin/projects';
import { verifyAuth } from '@/server/api/middleware';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    // Get projects (no auth check - public endpoint)
    const projects = await getProjects();

    if (!projects) {
      return NextResponse.json(
        { error: 'Projects not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    // Check authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();

    // Update projects
    const updated = await updateProjects(body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Update projects error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
};
