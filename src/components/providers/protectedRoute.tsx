import { selectRole } from '@/features/userSlice';
import { useAppSelector } from '@/hooks/redux-hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles: Array<'P' | 'D' | 'S' | 'N'>;
    redirectPath?: string;
    children: ReactNode;
}

export function ProtectedRoute({ children, allowedRoles, redirectPath = '/' }: ProtectedRouteProps) {
    const userRole = useAppSelector(selectRole);

    if (!allowedRoles.includes(userRole!)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
}
