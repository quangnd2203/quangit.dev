import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/verify', {
                method: 'GET',
                credentials: 'include', // Include cookies
            });

            const data = await response.json();
            setIsAuthenticated(data.authenticated === true);
        } catch (error) {
            console.error('Auth check error:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        isAuthenticated,
        isLoading,
        checkAuth,
    };
};
