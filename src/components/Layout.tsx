import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
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
    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;
    console.log(keycloak);
    useEffect(() => {
        if (!isAuthenticated) {
            keycloak.login({ redirectUri: window.location.origin });
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : null;
};
