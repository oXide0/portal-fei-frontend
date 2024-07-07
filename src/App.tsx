import { RouterProvider } from "react-router-dom";
import KeycloakProvider from "./components/KeycloakProvider";
import { router } from "./routes";

const App = () => {
    return (
        <KeycloakProvider>
            <RouterProvider router={router} />
        </KeycloakProvider>
    );
};

export default App;
