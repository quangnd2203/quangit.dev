import { useState } from 'react';
import { Project } from '@/core/entities/Project';

export const useProjectModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isOpen = selectedProject !== null;

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return {
    selectedProject,
    isOpen,
    openModal,
    closeModal
  };
};
