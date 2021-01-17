import { useAccessTokenCookie, useGetAccessToken, createCookieString } from '@hilma/auth-native';

const useAuthCookie = (): string => {
    const cookieName = useAccessTokenCookie();

    const getAccessToken = useGetAccessToken();
    const accessToken = getAccessToken();

    if (!accessToken) {
        return "";
    }

    return createCookieString({ [cookieName]: accessToken });
}

export default useAuthCookie;