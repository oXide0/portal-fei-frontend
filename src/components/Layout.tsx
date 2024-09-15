import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setRole, setToken } from "../features/userSlice";
import { parseIdToken } from "../helpers";
import { useAppDispatch } from "../hooks/redux-hooks";
import Header from "./Header";

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
    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;
    console.log(keycloak);

    useEffect(() => {
        if (!isAuthenticated) {
            keycloak.login({ redirectUri: window.location.origin });
        }
        if (keycloak.idToken) {
            const parsedToken = parseIdToken(keycloak.idToken);
            dispatch(setToken(keycloak.idToken));
            dispatch(setRole(parsedToken.employee_type));
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : null;
};
