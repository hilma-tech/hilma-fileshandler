import { Request } from "express";
import { RequestUserType } from "./requestUser.type";

export type PermissionsFilterType =
    (path: string, user: RequestUserType | null, req: Request) => Promise<boolean> | boolean;