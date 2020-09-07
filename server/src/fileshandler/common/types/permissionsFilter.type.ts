import { RequestUserType } from "@hilma/auth-nest";

export type PermissionsFilterType =
    (path: string, user: RequestUserType | null, autoAllow: boolean) => Promise<boolean> | boolean;