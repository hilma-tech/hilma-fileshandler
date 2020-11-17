import { Request } from "express";
import { RequestUserType } from "../types/requestUser.type";

export interface PermissionsFilterInterface {
    hasAccess(path: string, user: RequestUserType | null, req: Request): boolean | Promise<boolean>;
}