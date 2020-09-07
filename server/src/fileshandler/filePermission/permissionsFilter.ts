import { RequestUserType } from "@hilma/auth-nest";

export async function permissionsFilter(path: string, user: RequestUserType | null, autoAllow:boolean): Promise<boolean> {
    return true;
};