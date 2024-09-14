import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import KeycloakProvider from "./components/KeycloakProvider";
import { store } from "./config/store";
import { router } from "./routes";

const App = () => {
    return (
        <Provider store={store}>
            <KeycloakProvider>
                <RouterProvider router={router} />
            </KeycloakProvider>
        </Provider>
    );
};

export default App;
