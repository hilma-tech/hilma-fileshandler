import { AuthConfig } from '@hilma/auth-mongo-nest';

export const configuration = (): AuthConfig => ({
    auth: {
        accessToken_cookie: "acca",
    },
    roleAccess: {

    }
});