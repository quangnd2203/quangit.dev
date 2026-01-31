'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/core/entities/Project';
import { ImageLightbox } from './ImageLightbox';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({
  project,
  isOpen,
  onClose
}: ProjectModalProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, lightboxIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setLightboxIndex(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const blockScroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest?.('[data-modal-scroll]') as HTMLElement | null;
      if (!scrollable) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;
      if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', blockScroll, { passive: false });
    return () => document.removeEventListener('wheel', blockScroll);
  }, [isOpen]);

  if (!project) return null;

  const images = [...(project.images ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const hasGallery = images.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex overflow-hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          style={{ overscrollBehavior: 'contain' }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/* Close button - top right */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md ring-1 ring-black/5 transition-all hover:bg-gray-100 hover:text-gray-800 hover:scale-105 active:scale-95"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Thumbnail - static image only, no carousel */}
            {(project.thumbnailUrl || (hasGallery && images[0])) ? (
              <div className="relative shrink-0 bg-linear-to-br from-gray-50 to-gray-100">
                <div className="relative aspect-video max-h-80 w-full overflow-hidden">
                  <Image
                    src={project.thumbnailUrl ?? images[0]!.url}
                    alt={images[0]?.alt ?? project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}

            {/* Content - scrollable */}
            <div
              data-modal-scroll
              className="min-h-0 flex-1 overflow-y-auto"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="p-6 md:p-8">
                <h2
                  id="project-modal-title"
                  className="mb-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
                >
                  <span className="bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </h2>
                {project.longDescription && (
                  <p className="mb-6 leading-relaxed text-gray-600">{project.longDescription}</p>
                )}

                {/* Thumbnail Gallery */}
                {hasGallery && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      <span className="h-px w-6 bg-primary" />
                      Gallery
                    </h3>
                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setLightboxIndex(index)}
                          className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-all hover:scale-105"
                        >
                          <Image
                            src={img.url}
                            alt={img.alt ?? `Image ${index + 1}`}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {project.achievements && project.achievements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      <span className="h-px w-6 bg-primary" />
                      Achievements
                    </h3>
                    <ul className="space-y-2.5">
                      {project.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      <span className="h-px w-6 bg-primary" />
                      Metrics
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-gray-200/80 bg-linear-to-br from-gray-50 to-white px-4 py-3 shadow-sm"
                        >
                          <span className="block text-xs font-medium text-gray-500">{m.label}</span>
                          <span className="text-lg font-bold text-gray-900">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    <span className="h-px w-6 bg-primary" />
                    Tech stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-gray-200/80 bg-gray-50/80 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.githubUrl || project.demoUrl) && (
                  <div className="mt-8 -mx-6 -mb-6 rounded-b-2xl border-t border-gray-100 bg-linear-to-b from-gray-50/80 to-white px-6 py-5 md:-mx-8 md:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group order-2 sm:order-1 flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-primary to-primary-dark px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Link Product
                          <svg className="h-4 w-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-1 sm:order-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <ImageLightbox
            images={images.map((img) => ({ url: img.url, alt: img.alt }))}
            initialIndex={lightboxIndex ?? 0}
            isOpen={lightboxIndex !== null}
            onClose={() => setLightboxIndex(null)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
