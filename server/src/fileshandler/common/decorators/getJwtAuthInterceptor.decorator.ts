
export function GetJwtAuthInterceptor() {
    try {
        const { UseJwtInterceptor } = require("@hilma/auth-nest");
        return UseJwtInterceptor();
    } catch (err) {
        try {
            const { UseJwtInterceptor } = require("@hilma/auth-mongo-nest");
            return UseJwtInterceptor();
        } catch (err) {
            return () => null;
        }
    }
}