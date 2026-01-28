'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useContactMessagesAdmin } from '../hooks/useContactMessagesAdmin';
import { ContactMessage } from '@/core/entities/ContactMessage';
import { formatDate } from '@/shared/utils/formatDate';
import { cn } from '@/shared/utils/cn';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const RecentActivity = () => {
  const { allMessages, loading } = useContactMessagesAdmin();

  const recentMessages = useMemo(() => {
    return [...allMessages]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 8); // Show last 8 messages
  }, [allMessages]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentMessages.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-sm">No recent messages</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <Link
          href="/admin/contact-messages"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View all
        </Link>
      </div>
      <div className="space-y-2">
        {recentMessages.map((message, index) => (
          <motion.div
            key={message.id || index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/admin/contact-messages?message=${message.id}`}
              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {message.status === 'unread' ? (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'text-sm font-medium text-gray-900 truncate',
                        message.status === 'unread' && 'font-semibold'
                      )}>
                        {message.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{message.email}</p>
                      <p className={cn(
                        'text-sm text-gray-700 mt-1 truncate',
                        message.status === 'unread' && 'font-medium'
                      )}>
                        {message.subject}
                      </p>
                    </div>
                    {message.isImportant && (
                      <svg
                        className="w-4 h-4 text-yellow-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
