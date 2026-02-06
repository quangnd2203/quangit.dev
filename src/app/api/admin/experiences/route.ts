import { NextResponse } from 'next/server';
import { getExperiences, updateExperiences } from '@/server/api/admin/experiences';
import { verifyAuth } from '@/server/api/middleware';
import { generateETag, validateETag } from '@/server/utils/cache';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    try {
        // Get experiences (no auth check - public endpoint)
        const experiences = await getExperiences();

        if (!experiences) {
            return NextResponse.json({ error: 'Experiences not found' }, { status: 404 });
        }

        const etag = generateETag(JSON.stringify(experiences));
        const validationResponse = validateETag(request, etag);
        if (validationResponse) return validationResponse;

        return NextResponse.json(experiences, {
            status: 200,
            headers: {
                'Cache-Control': 'public, no-cache, must-revalidate',
                ETag: `"${etag}"`,
            },
        });
    } catch (error) {
        console.error('Get experiences error:', error);
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

        // Update experiences
        const updated = await updateExperiences(body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error('Update experiences error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};
