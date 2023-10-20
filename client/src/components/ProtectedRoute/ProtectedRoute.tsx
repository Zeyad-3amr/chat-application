import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserIdStore } from '../../store/userStorage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const id = useUserIdStore((state) => state.userProfile._id);

  if (!id) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
