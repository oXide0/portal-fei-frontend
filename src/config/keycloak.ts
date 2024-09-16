import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const keycloakInitConfig: KeycloakInitOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false,
    scope: 'employee_info',
};

export { keycloak, keycloakInitConfig };
