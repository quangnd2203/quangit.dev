import { useState, useEffect } from 'react';
import { GetExperiences } from '@/core/use-cases/GetExperiences';
import { ExperienceRepository } from '@/infrastructure/repositories/ExperienceRepository';
import { Experience } from '@/core/entities/Experience';

export const useExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new ExperienceRepository();
        const useCase = new GetExperiences(repository);
        const data = await useCase.execute();
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { experiences, loading, error };
};
