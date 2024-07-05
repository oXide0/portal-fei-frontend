import { ReactKeycloakProvider } from '@react-keycloak/web';
import { RouterProvider } from 'react-router-dom';
import { keycloak } from './keycloak';
import { router } from './routes';

const App = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <RouterProvider router={router} />
        </ReactKeycloakProvider>
    );
};

export default App;
