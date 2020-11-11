import { RequestUserType } from "./requestUser.type";

export type PermissionsFilterType =
    (path: string, user: RequestUserType | null, autoAllow: boolean) => Promise<boolean> | boolean;