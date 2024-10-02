import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setId, setRole, setToken } from '../../features/userSlice';
import { parseIdToken } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Header } from '../header';
import { Skeleton } from '../ui/skeleton';

const Layout = () => {
    return (
        <ProtectedRoute>
            <Header />
            <div className="pt-7">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export { Layout };

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useAppSelector((state) => state.user.token);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;
    console.log(keycloak);

    useEffect(() => {
        if (!isAuthenticated) {
            keycloak.login({ redirectUri: window.location.origin });
            navigate('/');
        }
        if (keycloak.idToken) {
            const parsedToken = parseIdToken(keycloak.idToken);
            dispatch(setId(parsedToken.sub));
            dispatch(setToken(keycloak.idToken));
            dispatch(setRole(parsedToken.employee_type));
        }
    }, [isAuthenticated, keycloak]);

    if (!token) return <Skeleton />;
    return isAuthenticated ? children : null;
};
