'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const leftContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const messageVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const contactInfo = [
  {
    id: 'email',
    icon: '📧',
    label: 'Email',
    value: 'quangnd22398.dev@gmail.com',
    href: 'mailto:quangnd22398.dev@gmail.com'
  },
  {
    id: 'phone',
    icon: '📱',
    label: 'Phone',
    value: '(+84) 34 781 1798',
    href: 'tel:+84347811798'
  },
  {
    id: 'github',
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/quangnd2203',
    href: 'https://github.com/quangnd2203',
    external: true
  },
  {
    id: 'website',
    icon: '🌐',
    label: 'Website',
    value: 'quangit.dev',
    href: 'https://quangit.dev',
    external: true
  }
];

export const ContactSection = () => {
  const { formData, loading, error, success, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-24 bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent pb-1">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Let's work together
          </p>
        </motion.div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <motion.div variants={leftContainerVariants} className="space-y-6">
              <motion.div variants={leftItemVariants} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Let&apos;s Connect</h3>
                <p className="text-gray-600">
                  Reach out through any of these channels or use the form.
                </p>
              </motion.div>

              {contactInfo.map((info) => (
                <motion.a
                  key={info.id}
                  variants={leftItemVariants}
                  href={info.href}
                  target={info.external ? '_blank' : undefined}
                  rel={info.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 py-5 px-6 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                >
                  <span className="text-3xl shrink-0">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500">{info.label}</p>
                    <p className="text-base font-semibold text-gray-900 truncate">
                      {info.value}
                    </p>
                  </div>
                  {info.external && (
                    <span className="text-gray-400 shrink-0">→</span>
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* Right: Form */}
            <motion.form
              variants={formVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Success/Error Messages */}
              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  >
                    <span className="text-green-600 text-xl shrink-0">✓</span>
                    <div>
                      <p className="text-green-800 font-medium">
                        Message sent successfully!
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <span className="text-red-600 text-xl shrink-0">✕</span>
                    <p className="text-red-800 font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all resize-none"
                  placeholder="Tell me about your project... (minimum 10 characters)"
                  minLength={10}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
