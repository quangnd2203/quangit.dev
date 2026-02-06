import { useState, useEffect } from 'react';
import { Experience } from '@/core/entities/Experience';

export const useExperiencesAdmin = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
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
                const response = await fetch('/api/admin/experiences', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to load experiences');
                }

                const data = await response.json();
                setExperiences(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load experiences');
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

    // Experience handlers
    const handleAddExperience = () => {
        const newExperience: Experience = {
            id: generateId('exp'),
            company: '',
            role: '',
            period: {
                start: '',
                end: 'Present',
            },
            achievements: [''],
            technologies: [],
            location: '',
        };
        setExperiences([...experiences, newExperience]);
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleUpdateExperience = (experienceId: string, updates: Partial<Experience>) => {
        setExperiences((prev) =>
            prev.map((exp) => (exp.id === experienceId ? { ...exp, ...updates } : exp))
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleDeleteExperience = (experienceId: string) => {
        setExperiences((prev) => prev.filter((exp) => exp.id !== experienceId));
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleMoveExperienceUp = (experienceId: string) => {
        setExperiences((prev) => {
            const index = prev.findIndex((exp) => exp.id === experienceId);
            if (index <= 0) return prev;
            const newExperiences = [...prev];
            [newExperiences[index - 1], newExperiences[index]] = [
                newExperiences[index],
                newExperiences[index - 1],
            ];
            return newExperiences;
        });
    };

    const handleMoveExperienceDown = (experienceId: string) => {
        setExperiences((prev) => {
            const index = prev.findIndex((exp) => exp.id === experienceId);
            if (index >= prev.length - 1) return prev;
            const newExperiences = [...prev];
            [newExperiences[index], newExperiences[index + 1]] = [
                newExperiences[index + 1],
                newExperiences[index],
            ];
            return newExperiences;
        });
    };

    // Achievement handlers
    const handleAddAchievement = (experienceId: string) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId ? { ...exp, achievements: [...exp.achievements, ''] } : exp
            )
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleUpdateAchievement = (
        experienceId: string,
        achievementIndex: number,
        value: string
    ) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId
                    ? {
                          ...exp,
                          achievements: exp.achievements.map((ach, idx) =>
                              idx === achievementIndex ? value : ach
                          ),
                      }
                    : exp
            )
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleDeleteAchievement = (experienceId: string, achievementIndex: number) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId
                    ? {
                          ...exp,
                          achievements: exp.achievements.filter(
                              (_, idx) => idx !== achievementIndex
                          ),
                      }
                    : exp
            )
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    // Technology handlers
    const handleAddTechnology = (experienceId: string) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId
                    ? { ...exp, technologies: [...(exp.technologies || []), ''] }
                    : exp
            )
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleUpdateTechnology = (experienceId: string, techIndex: number, value: string) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId
                    ? {
                          ...exp,
                          technologies: (exp.technologies || []).map((tech, idx) =>
                              idx === techIndex ? value : tech
                          ),
                      }
                    : exp
            )
        );
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleDeleteTechnology = (experienceId: string, techIndex: number) => {
        setExperiences((prev) =>
            prev.map((exp) =>
                exp.id === experienceId
                    ? {
                          ...exp,
                          technologies: (exp.technologies || []).filter(
                              (_, idx) => idx !== techIndex
                          ),
                      }
                    : exp
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
            for (const experience of experiences) {
                if (!experience.company) {
                    throw new Error(`Experience "${experience.id}" must have a company`);
                }
                if (!experience.role) {
                    throw new Error(`Experience "${experience.id}" must have a role`);
                }
                if (!experience.period?.start) {
                    throw new Error(`Experience "${experience.id}" must have a start date`);
                }
                if (!experience.period?.end) {
                    throw new Error(`Experience "${experience.id}" must have an end date`);
                }
                if (!experience.achievements || experience.achievements.length === 0) {
                    throw new Error(
                        `Experience "${experience.id}" must have at least one achievement`
                    );
                }
                for (const achievement of experience.achievements) {
                    if (!achievement.trim()) {
                        throw new Error(`Experience "${experience.id}" has empty achievements`);
                    }
                }
            }

            const response = await fetch('/api/admin/experiences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(experiences),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update experiences');
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update experiences');
        } finally {
            setSaving(false);
        }
    };

    return {
        experiences,
        loading,
        saving,
        error,
        success,
        handleAddExperience,
        handleUpdateExperience,
        handleDeleteExperience,
        handleMoveExperienceUp,
        handleMoveExperienceDown,
        handleAddAchievement,
        handleUpdateAchievement,
        handleDeleteAchievement,
        handleAddTechnology,
        handleUpdateTechnology,
        handleDeleteTechnology,
        handleSubmit,
    };
};
