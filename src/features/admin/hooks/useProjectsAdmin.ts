import { useState, useEffect } from 'react';
import { Project, ProjectAsset } from '@/core/entities/Project';

export const useProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/admin/projects', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to load projects');
        }

        const data = await response.json();
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate unique ID
  const generateId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Project handlers
  const handleAddProject = () => {
    const newProject: Project = {
      id: generateId('project'),
      title: '',
      description: '',
      technologies: [''],
      featured: false,
    };
    setProjects([...projects, newProject]);
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId ? { ...proj, ...updates } : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(proj => proj.id !== projectId));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleMoveProjectUp = (projectId: string) => {
    setProjects(prev => {
      const index = prev.findIndex(proj => proj.id === projectId);
      if (index <= 0) return prev;
      const newProjects = [...prev];
      [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
      return newProjects;
    });
  };

  const handleMoveProjectDown = (projectId: string) => {
    setProjects(prev => {
      const index = prev.findIndex(proj => proj.id === projectId);
      if (index >= prev.length - 1) return prev;
      const newProjects = [...prev];
      [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
      return newProjects;
    });
  };

  // Technology handlers
  const handleAddTechnology = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? { ...proj, technologies: [...proj.technologies, ''] }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateTechnology = (projectId: string, techIndex: number, value: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              technologies: proj.technologies.map((tech, idx) =>
                idx === techIndex ? value : tech
              ),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteTechnology = (projectId: string, techIndex: number) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              technologies: proj.technologies.filter((_, idx) => idx !== techIndex),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Image handlers
  const handleAddImage = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              images: [...(proj.images || []), { type: 'image', url: '', order: (proj.images?.length || 0) }],
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateImage = (projectId: string, imageIndex: number, updates: Partial<ProjectAsset>) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              images: (proj.images || []).map((img, idx) =>
                idx === imageIndex ? { ...img, ...updates } : img
              ),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteImage = (projectId: string, imageIndex: number) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              images: (proj.images || []).filter((_, idx) => idx !== imageIndex),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Achievement handlers
  const handleAddAchievement = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? { ...proj, achievements: [...(proj.achievements || []), ''] }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateAchievement = (projectId: string, achievementIndex: number, value: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              achievements: (proj.achievements || []).map((ach, idx) =>
                idx === achievementIndex ? value : ach
              ),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteAchievement = (projectId: string, achievementIndex: number) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              achievements: (proj.achievements || []).filter((_, idx) => idx !== achievementIndex),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Metric handlers
  const handleAddMetric = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              metrics: [...(proj.metrics || []), { label: '', value: '' }],
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateMetric = (projectId: string, metricIndex: number, field: 'label' | 'value', value: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              metrics: (proj.metrics || []).map((metric, idx) =>
                idx === metricIndex ? { ...metric, [field]: value } : metric
              ),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteMetric = (projectId: string, metricIndex: number) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? {
              ...proj,
              metrics: (proj.metrics || []).filter((_, idx) => idx !== metricIndex),
            }
          : proj
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate
      for (const project of projects) {
        if (!project.title) {
          throw new Error(`Project "${project.id}" must have a title`);
        }
        if (!project.description) {
          throw new Error(`Project "${project.id}" must have a description`);
        }
        if (!project.technologies || project.technologies.length === 0) {
          throw new Error(`Project "${project.id}" must have at least one technology`);
        }
        for (const tech of project.technologies) {
          if (!tech.trim()) {
            throw new Error(`Project "${project.id}" has empty technologies`);
          }
        }
        if (project.images) {
          for (const image of project.images) {
            if (!image.url.trim()) {
              throw new Error(`Project "${project.id}" has images with empty URLs`);
            }
          }
        }
      }

      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projects),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update projects');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update projects');
    } finally {
      setSaving(false);
    }
  };

  return {
    projects,
    loading,
    saving,
    error,
    success,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
    handleMoveProjectUp,
    handleMoveProjectDown,
    handleAddTechnology,
    handleUpdateTechnology,
    handleDeleteTechnology,
    handleAddImage,
    handleUpdateImage,
    handleDeleteImage,
    handleAddAchievement,
    handleUpdateAchievement,
    handleDeleteAchievement,
    handleAddMetric,
    handleUpdateMetric,
    handleDeleteMetric,
    handleSubmit,
  };
};
