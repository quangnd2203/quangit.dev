import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Generate a simple ETag based on the content string
 */
export const generateETag = (content: string): string => {
    return crypto.createHash('sha1').update(content).digest('hex');
};

/**
 * Validates the ETag against the If-None-Match header
 * Returns a 304 response if they match, or null if they don't
 */
export const validateETag = (request: Request, etag: string): NextResponse | null => {
    const ifNoneMatch = request.headers.get('if-none-match');

    // Handlers for "W/" prefix or quotes
    const normalizedETag = etag.replace(/^W\//, '').replace(/"/g, '');
    const normalizedIfNoneMatch = ifNoneMatch?.replace(/^W\//, '').replace(/"/g, '');

    if (normalizedIfNoneMatch === normalizedETag) {
        return new NextResponse(null, {
            status: 304,
            headers: {
                ETag: `"${normalizedETag}"`,
                'Cache-Control': 'public, no-cache, must-revalidate',
            },
        });
    }

    return null;
};
