import { useState } from 'react';
import { Project } from '@/core/entities/Project';

export const useProjectModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isOpen = selectedProject !== null;

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedProject.images!.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images!.length - 1 : prev - 1
      );
    }
  };

  return {
    selectedProject,
    isOpen,
    currentImageIndex,
    openModal,
    closeModal,
    nextImage,
    prevImage
  };
};
