import { NextResponse } from 'next/server';
import { getSkills, updateSkills } from '@/server/api/admin/skills';
import { verifyAuth } from '@/server/api/middleware';
import { generateETag, validateETag } from '@/server/utils/cache';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    try {
        // Get skills (no auth check - public endpoint)
        const skills = await getSkills();

        if (!skills) {
            return NextResponse.json({ error: 'Skills not found' }, { status: 404 });
        }

        const etag = generateETag(JSON.stringify(skills));
        const validationResponse = validateETag(request, etag);
        if (validationResponse) return validationResponse;

        return NextResponse.json(skills, {
            status: 200,
            headers: {
                'Cache-Control': 'public, no-cache, must-revalidate',
                ETag: `"${etag}"`,
            },
        });
    } catch (error) {
        console.error('Get skills error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const PUT = async (request: Request) => {
    try {
        // Check authentication
        const authResult = await verifyAuth(request);
        if (!authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get request body
        const body = await request.json();

        // Update skills
        const updated = await updateSkills(body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error('Update skills error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};
