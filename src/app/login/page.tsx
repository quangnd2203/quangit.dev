'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginDialog } from '@/features/admin/components/LoginDialog';

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Open dialog when page loads
    setIsDialogOpen(true);
  }, []);

  const handleClose = () => {
    setIsDialogOpen(false);
    // Redirect to home after closing
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginDialog isOpen={isDialogOpen} onClose={handleClose} />
    </div>
  );
};

export default LoginPage;
