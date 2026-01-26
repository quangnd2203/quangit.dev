import { useState, ChangeEvent, FormEvent } from 'react';
import { SendContactMessage } from '@/core/use-cases/SendContactMessage';
import { ContactRepository } from '@/infrastructure/repositories/ContactRepository';
import { ContactMessage } from '@/core/entities/ContactMessage';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate limiting check (30 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      setError('Please wait before sending another message');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const repository = new ContactRepository();
      const useCase = new SendContactMessage(repository);
      
      const messageData: ContactMessage = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };
      
      await useCase.execute(messageData);

      setSuccess(true);
      setLastSubmitTime(now);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleSubmit
  };
};
