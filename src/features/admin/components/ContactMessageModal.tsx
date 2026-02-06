'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactMessage } from '@/core/entities/ContactMessage';
import { formatDate } from '@/shared/utils/formatDate';

interface ContactMessageModalProps {
    message: ContactMessage | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdateStatus: (id: string, status: 'unread' | 'read') => void;
    onToggleImportant: (id: string, isImportant: boolean) => void;
    onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status?: 'unread' | 'read' }) => {
    const statusConfig = {
        unread: { label: 'Unread', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        read: { label: 'Read', className: 'bg-green-100 text-green-800 border-green-200' },
    };

    const config = statusConfig[status || 'unread'];

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
        >
            {config.label}
        </span>
    );
};

const ImportantBadge = ({ isImportant }: { isImportant?: boolean }) => {
    if (!isImportant) return null;

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-800 border-yellow-200">
            ⭐ Important
        </span>
    );
};

export const ContactMessageModal = ({
    message,
    isOpen,
    onClose,
    onUpdateStatus,
    onToggleImportant,
    onDelete,
}: ContactMessageModalProps) => {
    // Handle ESC key to close
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when dialog is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!message) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-message-modal-title"
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md ring-1 ring-black/5 transition-all hover:bg-gray-100 hover:text-gray-800 hover:scale-105 active:scale-95"
                            aria-label="Close"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Modal Content */}
                        <div className="overflow-y-auto max-h-[90vh]">
                            <div className="p-6">
                                {/* Header */}
                                <div className="mb-6 pt-2">
                                    {/* Title - full width */}
                                    <h2
                                        id="contact-message-modal-title"
                                        className="text-2xl font-extrabold text-gray-900 mb-4 pr-12"
                                    >
                                        {message.subject}
                                    </h2>

                                    {/* Info row với status badge */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <StatusBadge status={message.status} />
                                        <ImportantBadge isImportant={message.isImportant} />
                                        <span className="text-gray-400">•</span>
                                        <span className="font-medium text-gray-600">
                                            {message.name}
                                        </span>
                                        <span className="text-gray-400">•</span>
                                        <a
                                            href={`mailto:${message.email}`}
                                            className="text-primary hover:text-primary-dark hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {message.email}
                                        </a>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-600">
                                            {formatDate(message.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {message.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                Status:
                                            </span>
                                            <div className="flex gap-2">
                                                {(['unread', 'read'] as const).map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => {
                                                            onUpdateStatus(message.id!, status);
                                                        }}
                                                        disabled={message.status === status}
                                                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                                            message.status === status
                                                                ? 'bg-primary text-white cursor-default'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() +
                                                            status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                Important:
                                            </span>
                                            <button
                                                onClick={() => {
                                                    onToggleImportant(
                                                        message.id!,
                                                        !message.isImportant
                                                    );
                                                }}
                                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                                                    message.isImportant
                                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {message.isImportant
                                                    ? '⭐ Marked'
                                                    : '☆ Mark as Important'}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Are you sure you want to delete this message?'
                                                )
                                            ) {
                                                onDelete(message.id!);
                                                onClose();
                                            }
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
