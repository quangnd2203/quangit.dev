import { NextResponse } from 'next/server';
import { getPersonalInfo, updatePersonalInfo } from '@/server/api/admin/personal-info';
import { verifyAuth } from '@/server/api/middleware';

export const GET = async (request: Request) => {
  try {
    // Check authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get personal info
    const personalInfo = await getPersonalInfo();

    if (!personalInfo) {
      return NextResponse.json(
        { error: 'Personal info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(personalInfo, { status: 200 });
  } catch (error) {
    console.error('Get personal info error:', error);
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

    // Update personal info
    const updated = await updatePersonalInfo(body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Update personal info error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
};
