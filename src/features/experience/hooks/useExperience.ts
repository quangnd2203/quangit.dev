import { useState, useEffect } from 'react';
import { GetExperiences } from '@/core/use-cases/GetExperiences';
import { ExperienceRepository } from '@/infrastructure/repositories/ExperienceRepository';
import { Experience } from '@/core/entities/Experience';

export const useExperience = (initialData?: Experience[]) => {
    const [experiences, setExperiences] = useState<Experience[]>(initialData || []);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) return;

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
    }, [initialData]);

    return { experiences, loading, error };
};
