import { getConnection, Brackets } from 'typeorm';
import {
    RequestUserType,
    SPECIAL_ROLES,
    PermissionTypeEnum,
    PermissionEnum,
    getAuthenticatedPermissionRules,
    getUnauthenticatedPermissionRules,
    PermissionRule
} from '@hilma/fileshandler-server';
import { FilePermission } from './filePermission.entity';

export async function permissionsFilter(path: string, user: RequestUserType | null, defaultAllow: boolean = false): Promise<boolean> {

    const permissions: any = await getConnection()
        .createQueryBuilder()
        .select("fp")
        .from(FilePermission, "fp")
        .where("path=:path", { path })
        .andWhere(new Brackets(qb => {
            qb.where("permission_type = :role", { role: PermissionTypeEnum.role })
                .andWhere("role_name IN (:...special_roles)", { special_roles: Object.values(SPECIAL_ROLES) });

            if (!user) {
                return;
            }
            qb.orWhere("permission_type = :user", { user: PermissionTypeEnum.user })
                .andWhere("user_id = :userId", { userId: user.id })
                .orWhere("permission_type = :role")
                .andWhere("role_name IN (:...roles)", { roles: user.roles });
        }))
        .getMany();

    const rules: PermissionRule[] =
        user
            ?
            getAuthenticatedPermissionRules(user)
            :
            getUnauthenticatedPermissionRules();

    for (let rule of rules) {
        const rulePermissions = permissions.filter(permission =>
            permission.permissionType === rule.permissionType
            &&
            (
                !rule.role
                ||
                (
                    typeof rule.role === "string"
                        ?
                        rule.role === permission.roleName
                        :
                        rule.role.includes(permission.roleName)
                )
            )
        );

        const deny = rulePermissions.find(permission => permission.permission === PermissionEnum.deny);
        if (deny) {
            return false;
        }

        if (rulePermissions.length) {
            return true;
        }
    }

    if (defaultAllow) {
        return true;
    }

    return false;
};