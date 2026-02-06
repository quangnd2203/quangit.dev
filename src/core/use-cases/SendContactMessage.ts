import { IContactRepository } from '../interfaces/IContactRepository';
import { ContactMessage } from '../entities/ContactMessage';

export class SendContactMessage {
    constructor(private contactRepository: IContactRepository) {}

    async execute(message: ContactMessage): Promise<ContactMessage> {
        // Business logic: Validate message
        this.validateMessage(message);

        // Set status and timestamp
        const messageToSave: ContactMessage = {
            ...message,
            status: 'unread',
            createdAt: new Date().toISOString(),
        };

        // Save to repository
        const savedMessage = await this.contactRepository.create(messageToSave);

        return savedMessage;
    }

    private validateMessage(message: ContactMessage): void {
        if (!message.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) {
            throw new Error('Invalid email format');
        }

        if (!message.message || message.message.length < 10) {
            throw new Error('Message must be at least 10 characters');
        }

        if (!message.name || message.name.trim().length === 0) {
            throw new Error('Name is required');
        }

        if (!message.subject || message.subject.trim().length === 0) {
            throw new Error('Subject is required');
        }
    }
}
