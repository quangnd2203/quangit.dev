import { ContactMessage } from '../entities/ContactMessage';

export interface IContactRepository {
    create(message: ContactMessage): Promise<ContactMessage>;
    getAll(): Promise<ContactMessage[]>;
    getById(id: string): Promise<ContactMessage | null>;
}
