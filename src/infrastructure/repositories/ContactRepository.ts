import { IContactRepository } from '@/core/interfaces/IContactRepository';
import { ContactMessage } from '@/core/entities/ContactMessage';

export class ContactRepository implements IContactRepository {
    async create(message: ContactMessage): Promise<ContactMessage> {
        try {
            const response = await fetch('/api/admin/contact-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: message.name,
                    email: message.email,
                    subject: message.subject,
                    message: message.message,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create contact message');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating contact message:', error);
            throw error instanceof Error ? error : new Error('Failed to create contact message');
        }
    }

    async getAll(): Promise<ContactMessage[]> {
        try {
            const response = await fetch('/api/admin/contact-messages', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contact messages');
            }

            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Error fetching contact messages:', error);
            return [];
        }
    }

    async getById(id: string): Promise<ContactMessage | null> {
        try {
            const messages = await this.getAll();
            return messages.find((msg) => msg.id === id) || null;
        } catch (error) {
            console.error('Error fetching contact message by id:', error);
            return null;
        }
    }
}
