'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useContactMessagesAdmin } from '../hooks/useContactMessagesAdmin';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const quickActions = [
  {
    id: 'personal-info',
    title: 'Edit Personal Info',
    description: 'Update your profile information',
    href: '/admin/personal-info',
    icon: '👤',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'add-project',
    title: 'Add New Project',
    description: 'Create a new portfolio project',
    href: '/admin/projects',
    icon: '🚀',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'add-experience',
    title: 'Add Experience',
    description: 'Add a new work experience',
    href: '/admin/experiences',
    icon: '💼',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'manage-skills',
    title: 'Manage Skills',
    description: 'Update your technical skills',
    href: '/admin/skills',
    icon: '🛠️',
    color: 'from-purple-500 to-purple-600',
  },
];

export const QuickActions = () => {
  const { allMessages } = useContactMessagesAdmin();
  
  const unreadCount = allMessages.filter(m => m.status === 'unread').length;
  const importantCount = allMessages.filter(m => m.isImportant).length;

  const messageActions = [
    {
      id: 'unread-messages',
      title: 'Unread Messages',
      description: `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`,
      href: '/admin/contact-messages?status=unread',
      icon: '📬',
      color: 'from-cyan-500 to-cyan-600',
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      id: 'important-messages',
      title: 'Important Messages',
      description: `${importantCount} important message${importantCount !== 1 ? 's' : ''}`,
      href: '/admin/contact-messages?important=important',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
      badge: importantCount > 0 ? importantCount : undefined,
    },
  ];

  const allActions = [...quickActions, ...messageActions];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-2">
        {allActions.map((action, index) => (
          <motion.div
            key={action.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`text-2xl p-2 rounded-lg bg-linear-to-br ${action.color} text-white group-hover:scale-110 transition-transform flex-shrink-0`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  {action.badge && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-red-500 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
