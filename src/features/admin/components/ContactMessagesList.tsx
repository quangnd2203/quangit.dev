'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactMessagesAdmin } from '../hooks/useContactMessagesAdmin';
import { ContactMessage } from '@/core/entities/ContactMessage';
import { ContactMessageModal } from './ContactMessageModal';
import { formatDate } from '@/shared/utils/formatDate';

const StatusBadge = ({ status }: { status?: 'unread' | 'read' }) => {
  if (status === 'read') return null; // Gmail không hiển thị badge cho read messages
  
  return (
    <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-blue-500" title="Unread" />
  );
};

const ImportantBadge = ({ isImportant, onClick }: { isImportant?: boolean; onClick?: (e: React.MouseEvent) => void }) => {
  if (!isImportant) return null;

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-yellow-500 hover:text-yellow-600 transition-colors"
      title="Mark as not important"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const MessageCard = ({ 
  message, 
  onClick,
  onToggleImportant,
  isSelected,
  onToggleSelect
}: { 
  message: ContactMessage;
  onClick: () => void;
  onToggleImportant?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  onToggleSelect?: (e: React.MouseEvent) => void;
}) => {
  const shouldBold = message.status === 'unread' || message.isImportant;
  
  return (
    <div className="flex items-center gap-2 group">
      {/* Checkbox - Outside card */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected || false}
          onChange={() => {}}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect?.(e);
          }}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        />
      </div>
      
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onClick={onClick}
        className={`flex-1 bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer ${
          message.isImportant ? 'bg-yellow-50' : ''
        } ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
      >
        <div className="px-4 py-3">
          <div className="flex items-start gap-3">
            {/* Status indicator & Important icon */}
            <div className="flex items-center gap-2 mt-0.5 flex-shrink-0">
              <StatusBadge status={message.status} />
              <ImportantBadge 
                isImportant={message.isImportant} 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleImportant?.(e);
                }}
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-base truncate ${shouldBold ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
                  {message.subject}
                </h3>
              </div>
              <div className={`flex items-center gap-2 text-xs ${shouldBold ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                <span>{message.name}</span>
                <span className="text-gray-400">&lt;</span>
                <a 
                  href={`mailto:${message.email}`}
                  className={`hover:text-gray-900 hover:underline ${shouldBold ? 'text-gray-700' : 'text-gray-600'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {message.email}
                </a>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-400">•</span>
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ContactMessagesList = () => {
  const {
    messages,
    allMessages,
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
  } = useContactMessagesAdmin();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Selection logic functions
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (isAllSelected()) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(messages.map(msg => msg.id!).filter(Boolean)));
    }
  };

  const isSelected = (id: string) => selectedIds.has(id);

  const isAllSelected = () => {
    if (messages.length === 0) return false;
    return messages.every(msg => msg.id && selectedIds.has(msg.id));
  };

  const selectedCount = selectedIds.size;

  // Sync selectedMessage with updated messages
  useEffect(() => {
    if (selectedMessage) {
      const updatedMessage = allMessages.find(msg => msg.id === selectedMessage.id);
      if (updatedMessage && (
        updatedMessage.status !== selectedMessage.status ||
        updatedMessage.isImportant !== selectedMessage.isImportant
      )) {
        setSelectedMessage(updatedMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMessages]);

  const openModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    // Auto-mark as read when opening unread message
    if (message.status === 'unread') {
      updateStatus(message.id!, 'read');
    }
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">
              Contact Messages
            </h1>
            <p className="text-lg text-gray-600">
              View and manage messages from your contact form
            </p>
          </div>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap mb-6">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            {(['all', 'unread', 'read'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  statusFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Separator */}
          <span className="text-gray-300">|</span>
          
          {/* Important Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Important:</span>
            {(['all', 'important', 'not-important'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setImportantFilter(filter)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  importantFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'not-important' ? 'Not Important' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Message Count */}
          <span className="ml-auto text-sm text-gray-600">
            {selectedCount > 0 ? (
              <span className="font-medium text-primary">{selectedCount} selected</span>
            ) : (
              <span>{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
            )}
          </span>
        </div>
      </motion.div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <span className="text-red-600 text-xl shrink-0">✕</span>
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
          >
            <span className="text-green-600 text-xl shrink-0">✓</span>
            <p className="text-green-800 font-medium">Operation completed successfully</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages List */}
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white border border-gray-200 rounded-lg"
        >
          <p className="text-gray-500 text-lg">No messages found</p>
          <p className="text-gray-400 text-sm mt-2">
            {(statusFilter !== 'all' || importantFilter !== 'all') 
              ? `No messages match the selected filters.` 
              : 'Contact messages will appear here.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-0.5">
          {/* Select All & Actions */}
          <div className="flex items-center justify-between gap-4 pb-3 h-[48px]">
            {/* Left: Select All - Fixed width */}
            <div className="w-[250px] flex items-center gap-2 flex-shrink-0">
              <input
                type="checkbox"
                checked={isAllSelected()}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Select All
              </span>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {selectedCount > 0 ? `(${selectedCount} selected)` : ''}
              </span>
            </div>

            {/* Right: Actions - Fixed width container */}
            <div className="w-[550px] flex justify-end flex-shrink-0">
              <AnimatePresence>
                {selectedCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-1.5 flex-wrap"
                  >
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors border border-transparent hover:border-gray-300 whitespace-nowrap"
                      onClick={async () => {
                        const idsArray = Array.from(selectedIds);
                        if (idsArray.length > 0) {
                          await bulkUpdateStatus(idsArray, 'read');
                          setSelectedIds(new Set());
                        }
                      }}
                    >
                      Mark as Read
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors border border-transparent hover:border-gray-300 whitespace-nowrap"
                      onClick={async () => {
                        const idsArray = Array.from(selectedIds);
                        if (idsArray.length > 0) {
                          await bulkUpdateStatus(idsArray, 'unread');
                          setSelectedIds(new Set());
                        }
                      }}
                    >
                      Mark as Unread
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-md transition-colors border border-transparent hover:border-yellow-300 whitespace-nowrap"
                      onClick={async () => {
                        const idsArray = Array.from(selectedIds);
                        if (idsArray.length > 0) {
                          await bulkToggleImportant(idsArray, true);
                          setSelectedIds(new Set());
                        }
                      }}
                    >
                      Mark as Important
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors border border-transparent hover:border-red-300 whitespace-nowrap"
                      onClick={async () => {
                        const idsArray = Array.from(selectedIds);
                        if (idsArray.length > 0) {
                          if (window.confirm(`Are you sure you want to delete ${idsArray.length} message${idsArray.length > 1 ? 's' : ''}?`)) {
                            await bulkDeleteMessages(idsArray);
                            setSelectedIds(new Set());
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <AnimatePresence>
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onClick={() => openModal(message)}
                onToggleImportant={() => {
                  toggleImportant(message.id!, !message.isImportant);
                }}
                isSelected={message.id ? isSelected(message.id) : false}
                onToggleSelect={() => {
                  if (message.id) toggleSelect(message.id);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Contact Message Modal */}
      <ContactMessageModal
        message={selectedMessage}
        isOpen={selectedMessage !== null}
        onClose={closeModal}
        onUpdateStatus={updateStatus}
        onToggleImportant={(id, isImportant) => toggleImportant(id, isImportant)}
        onDelete={deleteMessage}
      />
    </div>
  );
};
