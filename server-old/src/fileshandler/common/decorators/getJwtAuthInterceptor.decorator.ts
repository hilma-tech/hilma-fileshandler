
export function GetJwtAuthInterceptor(): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void {
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