'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useHome } from '@/features/home/hooks/useHome';
import { useSkills } from '@/features/skills/hooks/useSkills';
import { useExperience } from '@/features/experience/hooks/useExperience';
import { useProjects } from '@/features/projects/hooks/useProjects';

interface DataContextType {
    home: ReturnType<typeof useHome>;
    skills: ReturnType<typeof useSkills>;
    experience: ReturnType<typeof useExperience>;
    projects: ReturnType<typeof useProjects>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    // Collect hook states in the provider
    const home = useHome();
    const skills = useSkills();
    const experience = useExperience();
    const projects = useProjects();

    return (
        <DataContext.Provider value={{ home, skills, experience, projects }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
