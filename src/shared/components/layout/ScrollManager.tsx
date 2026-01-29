'use client';

import { useEffect } from 'react';

interface ScrollManagerProps {
    target?: string;
}

export const ScrollManager = ({ target }: ScrollManagerProps) => {
    useEffect(() => {
        if (!target) return;

        const timer = window.setTimeout(() => {
            const el = document.getElementById(target);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [target]);

    return null;
};
