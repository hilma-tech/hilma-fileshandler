import useAuthCookie from "./useAuthCookie";

type AuthHeaders = {
    Cookie: string
};

const useAuthHeaders = (): AuthHeaders => {
    const cookies = useAuthCookie();
    return {
        Cookie: cookies
    };
}

export default useAuthHeaders;