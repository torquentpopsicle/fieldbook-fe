import { ReactNode } from 'react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { useAuth } from '@/contexts/AuthContext';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { loading } = useAuth();
  
  // Initialize token refresh hook
  useTokenRefresh();

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sport-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper; 