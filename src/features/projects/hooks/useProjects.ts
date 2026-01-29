import { useState, useEffect } from 'react';
import { GetProjects } from '@/core/use-cases/GetProjects';
import { ProjectRepository } from '@/infrastructure/repositories/ProjectRepository';
import { Project } from '@/core/entities/Project';

export const useProjects = (initialData?: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const repository = new ProjectRepository();
        const useCase = new GetProjects(repository);
        const data = await useCase.execute();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initialData]);

  return { projects, loading, error };
};
