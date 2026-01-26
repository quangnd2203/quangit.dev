import { useState, useEffect } from 'react';
import { GetProjects } from '@/core/use-cases/GetProjects';
import { ProjectRepository } from '@/infrastructure/repositories/ProjectRepository';
import { Project } from '@/core/entities/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return { projects, loading, error };
};
