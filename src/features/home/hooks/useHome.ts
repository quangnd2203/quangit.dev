import { useState, useEffect } from 'react';
import { GetPersonalInfo } from '@/core/use-cases/GetPersonalInfo';
import { PersonalInfoRepository } from '@/infrastructure/repositories/PersonalInfoRepository';
import { PersonalInfo } from '@/core/entities/PersonalInfo';

export const useHome = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
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
  }, []);
  
  return { personalInfo, loading, error };
};
