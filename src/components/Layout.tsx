import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <ProtectedRoute>
            <Header />
            <Outlet />
        </ProtectedRoute>
    );
};

export default Layout;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();
    const isLoggedIn = keycloak.authenticated;

    useEffect(() => {
        if (!isLoggedIn) {
            alert("You need to login to access this page");
            keycloak.login();
        } else {
            alert("You are logged in");
            navigate("/");
        }
    }, [isLoggedIn]);

    return isLoggedIn ? children : null;
};
