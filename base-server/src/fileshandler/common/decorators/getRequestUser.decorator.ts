export function GetRequestUser(): ParameterDecorator{
    try {
        const { RequestUser } = require("@hilma/auth-nest");
        return RequestUser();
    } catch (err) {
        try {
            const { RequestUser } = require("@hilma/auth-mongo-nest");
            return RequestUser();
        } catch (err) {
            return () => null;
        }
    }
}