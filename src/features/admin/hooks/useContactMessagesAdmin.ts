import { useState, useEffect } from 'react';
import { ContactMessage } from '@/core/entities/ContactMessage';

export const useContactMessagesAdmin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [importantFilter, setImportantFilter] = useState<'all' | 'important' | 'not-important'>('all');

  // Load messages on mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/contact-messages', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in.');
        }
        throw new Error('Failed to load contact messages');
      }

      const data = await response.json();
      setMessages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'unread' | 'read') => {
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update message status');
      }

      const updated = await response.json();
      
      // Update local state
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? updated : msg))
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message status');
    }
  };

  const bulkUpdateStatus = async (ids: string[], status: 'unread' | 'read') => {
    setError(null);
    setSuccess(false);

    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('IDs array is required and must not be empty');
      }

      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ids, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to bulk update message status');
      }

      const updated = await response.json();
      
      // Update local state with all updated messages
      setMessages(prev =>
        prev.map(msg => {
          const updatedMsg = updated.find((u: ContactMessage) => u.id === msg.id);
          return updatedMsg || msg;
        })
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bulk update message status');
    }
  };

  const bulkToggleImportant = async (ids: string[], isImportant: boolean) => {
    setError(null);
    setSuccess(false);

    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('IDs array is required and must not be empty');
      }

      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ids, isImportant }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to bulk toggle important status');
      }

      const updated = await response.json();
      
      // Update local state with all updated messages
      setMessages(prev =>
        prev.map(msg => {
          const updatedMsg = updated.find((u: ContactMessage) => u.id === msg.id);
          return updatedMsg || msg;
        })
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bulk toggle important status');
    }
  };

  const toggleImportant = async (id: string, isImportant: boolean) => {
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, isImportant }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle important status');
      }

      const updated = await response.json();
      
      // Update local state
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? updated : msg))
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle important status');
    }
  };

  const bulkDeleteMessages = async (ids: string[]) => {
    setError(null);
    setSuccess(false);

    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('IDs array is required and must not be empty');
      }

      const response = await fetch('/api/admin/contact-messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to bulk delete messages');
      }

      // Remove deleted messages from local state
      setMessages(prev => prev.filter(msg => !ids.includes(msg.id!)));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bulk delete messages');
    }
  };

  const deleteMessage = async (id: string) => {
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/contact-messages?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete message');
      }

      // Remove from local state
      setMessages(prev => prev.filter(msg => msg.id !== id));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  };

  const refresh = () => {
    loadMessages();
  };

  // Filter messages by status and important
  const filteredMessages = messages.filter(msg => {
    // Status filter
    const statusMatch = statusFilter === 'all' || msg.status === statusFilter;
    // Important filter
    const importantMatch = importantFilter === 'all' 
      || (importantFilter === 'important' && msg.isImportant)
      || (importantFilter === 'not-important' && !msg.isImportant);
    
    return statusMatch && importantMatch;
  });

  return {
    messages: filteredMessages,
    allMessages: messages,
    loading,
    error,
    success,
    statusFilter,
    setStatusFilter,
    importantFilter,
    setImportantFilter,
    updateStatus,
    bulkUpdateStatus,
    toggleImportant,
    bulkToggleImportant,
    deleteMessage,
    bulkDeleteMessages,
    refresh,
  };
};
