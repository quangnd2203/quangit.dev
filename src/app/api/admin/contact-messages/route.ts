import { NextResponse } from 'next/server';
import {
    getContactMessages,
    createContactMessage,
    updateContactMessageStatus,
    bulkUpdateContactMessageStatus,
    toggleContactMessageImportant,
    bulkToggleContactMessageImportant,
    deleteContactMessage,
    bulkDeleteContactMessages,
} from '@/server/api/admin/contact-messages';
import { verifyAuth } from '@/server/api/middleware';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    try {
        // Check authentication (protected endpoint for admin)
        const authResult = await verifyAuth(request);
        if (!authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get contact messages
        const messages = await getContactMessages();

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error('Get contact messages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        // No auth required (public endpoint for contact form)
        const body = await request.json();

        // Create contact message
        const newMessage = await createContactMessage({
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: body.message,
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error('Create contact message error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};

export const PUT = async (request: Request) => {
    try {
        // Check authentication (protected endpoint for admin)
        const authResult = await verifyAuth(request);
        if (!authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ids, status, isImportant } = body;

        // Handle bulk operations (ids array provided)
        if (ids && Array.isArray(ids)) {
            if (ids.length === 0) {
                return NextResponse.json({ error: 'IDs array must not be empty' }, { status: 400 });
            }

            // Bulk update status
            if (status !== undefined) {
                if (!['unread', 'read'].includes(status)) {
                    return NextResponse.json(
                        { error: 'Invalid status. Must be unread or read' },
                        { status: 400 }
                    );
                }

                const updated = await bulkUpdateContactMessageStatus(ids, status);
                return NextResponse.json(updated, { status: 200 });
            }

            // Bulk toggle important status
            if (isImportant !== undefined) {
                if (typeof isImportant !== 'boolean') {
                    return NextResponse.json(
                        { error: 'isImportant must be a boolean' },
                        { status: 400 }
                    );
                }

                const updated = await bulkToggleContactMessageImportant(ids, isImportant);
                return NextResponse.json(updated, { status: 200 });
            }

            return NextResponse.json(
                { error: 'Either status or isImportant is required for bulk operations' },
                { status: 400 }
            );
        }

        // Handle single operations (id provided)
        if (!id) {
            return NextResponse.json(
                { error: 'Message id or ids array is required' },
                { status: 400 }
            );
        }

        // Update status if provided
        if (status !== undefined) {
            if (!['unread', 'read'].includes(status)) {
                return NextResponse.json(
                    { error: 'Invalid status. Must be unread or read' },
                    { status: 400 }
                );
            }

            const updated = await updateContactMessageStatus(id, status);
            return NextResponse.json(updated, { status: 200 });
        }

        // Toggle important status if provided
        if (isImportant !== undefined) {
            if (typeof isImportant !== 'boolean') {
                return NextResponse.json(
                    { error: 'isImportant must be a boolean' },
                    { status: 400 }
                );
            }

            const updated = await toggleContactMessageImportant(id, isImportant);
            return NextResponse.json(updated, { status: 200 });
        }

        return NextResponse.json(
            { error: 'Either status or isImportant must be provided' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Update contact message error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: Request) => {
    try {
        // Check authentication (protected endpoint for admin)
        const authResult = await verifyAuth(request);
        if (!authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Try to get ids from request body (for bulk delete)
        let body: { ids?: string[] } | null = null;
        try {
            body = await request.json().catch(() => null);
        } catch {
            // Body might not be present, that's okay
        }

        // Handle bulk operations (ids array provided in body)
        if (body && body.ids && Array.isArray(body.ids)) {
            if (body.ids.length === 0) {
                return NextResponse.json({ error: 'IDs array must not be empty' }, { status: 400 });
            }

            // Bulk delete messages
            await bulkDeleteContactMessages(body.ids);

            return NextResponse.json(
                { success: true, deletedCount: body.ids.length },
                { status: 200 }
            );
        }

        // Handle single operations (id provided in query params)
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Message id or ids array is required' },
                { status: 400 }
            );
        }

        // Delete single message
        await deleteContactMessage(id);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Delete contact message error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};
