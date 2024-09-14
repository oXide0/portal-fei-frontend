export const parseIdToken = (idToken: string) => {
    if (!idToken) {
        throw new Error("Invalid token");
    }

    const tokenParts = idToken.split(".");

    if (tokenParts.length !== 3) {
        throw new Error("Invalid token structure");
    }

    try {
        const payload = atob(tokenParts[1]);

        return JSON.parse(payload);
    } catch (error) {
        throw new Error("Failed to parse token payload");
    }
};
