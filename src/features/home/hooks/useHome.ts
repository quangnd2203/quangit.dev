import { useState, useEffect } from 'react';
import { GetPersonalInfo } from '@/core/use-cases/GetPersonalInfo';
import { PersonalInfoRepository } from '@/infrastructure/repositories/PersonalInfoRepository';
import { PersonalInfo } from '@/core/entities/PersonalInfo';

export const useHome = (initialData?: PersonalInfo | null) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have initial data, don't need to load
    if (initialData) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const repository = new PersonalInfoRepository();
        const useCase = new GetPersonalInfo(repository);
        const data = await useCase.execute();
        setPersonalInfo(data);
      } catch (err) {
        setError('Failed to load personal info');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialData]);

  return { personalInfo, loading, error };
};
