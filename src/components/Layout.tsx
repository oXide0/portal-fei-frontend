import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setId, setRole, setToken } from '../features/userSlice';
import { parseIdToken } from '../helpers';
import { useAppDispatch } from '../hooks/redux-hooks';
import Header from './Header';

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

export default Layout;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

    return isAuthenticated ? children : null;
};
