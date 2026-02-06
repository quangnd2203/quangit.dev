export interface ContactMessage {
    id?: string; // Unique identifier (generated on server)
    name: string; // Sender name
    email: string; // Sender email
    subject: string; // Message subject
    message: string; // Message content
    createdAt?: string; // Submission timestamp
    status?: 'unread' | 'read'; // Message status
    isImportant?: boolean; // Mark message as important
}
