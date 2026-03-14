'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useHome } from '@/features/home/hooks/useHome';
import { useSkills } from '@/features/skills/hooks/useSkills';
import { useExperience } from '@/features/experience/hooks/useExperience';
import { useProjects } from '@/features/projects/hooks/useProjects';
import type { InitialData } from '@/app/[[...page]]/page';

interface DataContextType {
    home: ReturnType<typeof useHome>;
    skills: ReturnType<typeof useSkills>;
    experience: ReturnType<typeof useExperience>;
    projects: ReturnType<typeof useProjects>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
    initialData?: InitialData;
}

export const DataProvider = ({ children, initialData }: DataProviderProps) => {
    // Pass server-fetched data to hooks — they skip useEffect when initialData is provided
    const home = useHome(initialData?.personalInfo);
    const skills = useSkills(initialData?.skills);
    const experience = useExperience(initialData?.experiences);
    const projects = useProjects(initialData?.projects);

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

