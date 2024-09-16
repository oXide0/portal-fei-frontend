import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { useState } from 'react';
import { keycloak, keycloakInitConfig } from '../config/keycloak';

const KeycloakProvider = ({ children }: { children: React.ReactNode }) => {
    const [keycloakInitialized, setKeycloakInitialized] = useState(false);

    const onKeycloakEvent = (event: AuthClientEvent, _?: AuthClientError) => {
        if (event === 'onAuthSuccess') {
            setKeycloakInitialized(true);
        }
    };

    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitConfig} onEvent={onKeycloakEvent}>
            {keycloakInitialized ? children : null}
        </ReactKeycloakProvider>
    );
};

export default KeycloakProvider;
