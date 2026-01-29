import { useState, useEffect } from 'react';
import { GetSkills } from '@/core/use-cases/GetSkills';
import { SkillRepository } from '@/infrastructure/repositories/SkillRepository';
import { SkillCategory } from '@/core/entities/SkillCategory';

export const useSkills = (initialData?: SkillCategory[]) => {
  const [categories, setCategories] = useState<SkillCategory[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new SkillRepository();
        const useCase = new GetSkills(repository);
        const data = await useCase.execute();
        setCategories(data);
      } catch (err) {
        setError('Failed to load skills');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialData]);

  return { categories, loading, error };
};
