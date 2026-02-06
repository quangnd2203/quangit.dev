import { ContactMessage } from '@/core/entities/ContactMessage';
import { readJsonFile, writeJsonFile } from '@/server/data/redisStorage';

// Redis key
const CONTACT_MESSAGES_KEY = 'contact-messages';

/**
 * Get all contact messages
 */
export const getContactMessages = async (): Promise<ContactMessage[]> => {
    try {
        const data = await readJsonFile<ContactMessage[]>(CONTACT_MESSAGES_KEY);
        return data || [];
    } catch (error) {
        console.error('Error getting contact messages:', error);
        throw new Error('Failed to get contact messages');
    }
};

/**
 * Create a new contact message
 */
export const createContactMessage = async (
    message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
): Promise<ContactMessage> => {
    try {
        // Validate required fields
        if (!message.name || message.name.trim() === '') {
            throw new Error('Name is required');
        }

        if (!message.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) {
            throw new Error('Valid email is required');
        }

        if (!message.subject || message.subject.trim() === '') {
            throw new Error('Subject is required');
        }

        if (!message.message || message.message.trim().length < 10) {
            throw new Error('Message must be at least 10 characters');
        }

        // Get existing messages
        const messages = await getContactMessages();

        // Create new message with generated ID and timestamp
        const newMessage: ContactMessage = {
            ...message,
            id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            status: 'unread',
            isImportant: false,
        };

        // Add to array (newest first)
        messages.unshift(newMessage);

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, messages);

        return newMessage;
    } catch (error) {
        console.error('Error creating contact message:', error);
        throw error instanceof Error ? error : new Error('Failed to create contact message');
    }
};

/**
 * Update contact message status
 */
export const updateContactMessageStatus = async (
    id: string,
    status: 'unread' | 'read'
): Promise<ContactMessage> => {
    try {
        const messages = await getContactMessages();
        const messageIndex = messages.findIndex((msg) => msg.id === id);

        if (messageIndex === -1) {
            throw new Error('Contact message not found');
        }

        // Update status
        messages[messageIndex] = {
            ...messages[messageIndex],
            status,
        };

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, messages);

        return messages[messageIndex];
    } catch (error) {
        console.error('Error updating contact message status:', error);
        throw error instanceof Error ? error : new Error('Failed to update contact message status');
    }
};

/**
 * Bulk update contact message status
 */
export const bulkUpdateContactMessageStatus = async (
    ids: string[],
    status: 'unread' | 'read'
): Promise<ContactMessage[]> => {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error('IDs array is required and must not be empty');
        }

        const messages = await getContactMessages();
        const updatedMessages: ContactMessage[] = [];
        const notFoundIds: string[] = [];

        // Update all matching messages
        for (let i = 0; i < messages.length; i++) {
            if (ids.includes(messages[i].id!)) {
                messages[i] = {
                    ...messages[i],
                    status,
                };
                updatedMessages.push(messages[i]);
            }
        }

        // Check if all IDs were found
        for (const id of ids) {
            if (!updatedMessages.find((msg) => msg.id === id)) {
                notFoundIds.push(id);
            }
        }

        if (notFoundIds.length > 0) {
            throw new Error(`Some messages were not found: ${notFoundIds.join(', ')}`);
        }

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, messages);

        return updatedMessages;
    } catch (error) {
        console.error('Error bulk updating contact message status:', error);
        throw error instanceof Error
            ? error
            : new Error('Failed to bulk update contact message status');
    }
};

/**
 * Bulk toggle important status of contact messages
 */
export const bulkToggleContactMessageImportant = async (
    ids: string[],
    isImportant: boolean
): Promise<ContactMessage[]> => {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error('IDs array is required and must not be empty');
        }

        const messages = await getContactMessages();
        const updatedMessages: ContactMessage[] = [];
        const notFoundIds: string[] = [];

        // Update all matching messages
        for (let i = 0; i < messages.length; i++) {
            if (ids.includes(messages[i].id!)) {
                messages[i] = {
                    ...messages[i],
                    isImportant,
                };
                updatedMessages.push(messages[i]);
            }
        }

        // Check if all IDs were found
        for (const id of ids) {
            if (!updatedMessages.find((msg) => msg.id === id)) {
                notFoundIds.push(id);
            }
        }

        if (notFoundIds.length > 0) {
            throw new Error(`Some messages were not found: ${notFoundIds.join(', ')}`);
        }

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, messages);

        return updatedMessages;
    } catch (error) {
        console.error('Error bulk toggling contact message important status:', error);
        throw error instanceof Error
            ? error
            : new Error('Failed to bulk toggle contact message important status');
    }
};

/**
 * Toggle important status of a contact message
 */
export const toggleContactMessageImportant = async (
    id: string,
    isImportant: boolean
): Promise<ContactMessage> => {
    try {
        const messages = await getContactMessages();
        const messageIndex = messages.findIndex((msg) => msg.id === id);

        if (messageIndex === -1) {
            throw new Error('Contact message not found');
        }

        // Update isImportant
        messages[messageIndex] = {
            ...messages[messageIndex],
            isImportant,
        };

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, messages);

        return messages[messageIndex];
    } catch (error) {
        console.error('Error toggling contact message important status:', error);
        throw error instanceof Error
            ? error
            : new Error('Failed to toggle contact message important status');
    }
};

/**
 * Bulk delete contact messages
 */
export const bulkDeleteContactMessages = async (ids: string[]): Promise<void> => {
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error('IDs array is required and must not be empty');
        }

        const messages = await getContactMessages();
        const originalLength = messages.length;
        const filteredMessages = messages.filter((msg) => !ids.includes(msg.id!));

        // Verify that at least one message was deleted
        if (filteredMessages.length === originalLength) {
            throw new Error('No messages were found to delete');
        }

        // Check which IDs were not found (optional, for better error reporting)
        const notFoundIds: string[] = [];
        for (const id of ids) {
            if (messages.find((msg) => msg.id === id)) {
                // Found, will be deleted
            } else {
                notFoundIds.push(id);
            }
        }

        // If some IDs were not found, we can still proceed but log a warning
        // Or throw error if strict validation is needed
        if (notFoundIds.length > 0 && notFoundIds.length === ids.length) {
            throw new Error(
                `No messages were found with the provided IDs: ${notFoundIds.join(', ')}`
            );
        }

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, filteredMessages);
    } catch (error) {
        console.error('Error bulk deleting contact messages:', error);
        throw error instanceof Error ? error : new Error('Failed to bulk delete contact messages');
    }
};

/**
 * Delete a contact message
 */
export const deleteContactMessage = async (id: string): Promise<void> => {
    try {
        const messages = await getContactMessages();
        const filteredMessages = messages.filter((msg) => msg.id !== id);

        if (filteredMessages.length === messages.length) {
            throw new Error('Contact message not found');
        }

        // Write to Redis
        await writeJsonFile(CONTACT_MESSAGES_KEY, filteredMessages);
    } catch (error) {
        console.error('Error deleting contact message:', error);
        throw error instanceof Error ? error : new Error('Failed to delete contact message');
    }
};
