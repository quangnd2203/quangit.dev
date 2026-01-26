'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Project } from '@/core/entities/Project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  variants?: Variants;
}

export const ProjectCard = ({ project, onClick, variants }: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);
  const hasThumbnail = Boolean(project.thumbnailUrl) && !imgError;

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 bg-gray-100">
        {hasThumbnail ? (
          <Image
            src={project.thumbnailUrl!}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold bg-primary text-white">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 text-sm text-gray-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};
