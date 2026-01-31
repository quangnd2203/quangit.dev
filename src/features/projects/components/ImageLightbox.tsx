'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetType } from '@/core/entities/Project';

export interface LightboxAsset {
  type?: AssetType;
  url: string;
  alt?: string;
}

// Keep old interface for backward compatibility
export interface LightboxImage extends LightboxAsset {}

interface ImageLightboxProps {
  images: LightboxAsset[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const navBtn =
  'absolute top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/5 transition-all hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95 text-gray-600 hover:text-primary';

// Helper function to convert Google Drive URL to embed URL
const getVideoEmbedUrl = (driveUrl: string): string => {
  // Extract file ID from drive.google.com/file/d/{ID}/view
  const match = driveUrl.match(/\/d\/([^/]+)/);
  const fileId = match?.[1];
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : driveUrl;
};

export const ImageLightbox = ({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentAsset = images[currentIndex]!;
  const assetType = currentAsset.type ?? 'image';

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(() => onClose(), 0);
          }
        }}
        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      >
        {/* Close button - stopPropagation + deferred close to prevent click-through to modal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(() => onClose(), 0);
          }}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-gray-800 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
            className={`${navBtn} left-4`}
            aria-label="Previous"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Media Content - Image or Video */}
        <div
          className="relative max-w-7xl max-h-[85vh] w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {assetType === 'video' ? (
            <iframe
              key={currentIndex}
              src={getVideoEmbedUrl(currentAsset.url)}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={currentAsset.alt ?? `Video ${currentIndex + 1}`}
            />
          ) : (
            <Image
              key={currentIndex}
              src={currentAsset.url}
              alt={currentAsset.alt ?? `Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          )}
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i + 1) % images.length);
            }}
            className={`${navBtn} right-4`}
            aria-label="Next"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};
