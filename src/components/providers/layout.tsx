import { Header } from '@/components/header';
import { getInitials } from '@/lib/utils';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setId, setInitials, setRole, setToken } from '../../features/userSlice';
import { parseIdToken } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

const Layout = () => {
    return (
        <ProtectedRoute>
            <Header />
            <div className="py-7 px-4 md:px-10">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export { Layout };

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useAppSelector((state) => state.user.token);
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;
    console.log(keycloak);

    useEffect(() => {
        if (!isAuthenticated) {
            keycloak.login({ redirectUri: window.location.origin });
        }
        if (keycloak.idToken) {
            const parsedToken = parseIdToken(keycloak.idToken);
            dispatch(setId(parsedToken.sub));
            dispatch(setToken(keycloak.idToken));
            dispatch(setRole(parsedToken.employee_type));
            dispatch(setInitials(getInitials(parsedToken.name)));
        }
    }, [isAuthenticated, keycloak]);

    if (!token) return <div className="loader"></div>;
    return isAuthenticated ? children : null;
};
