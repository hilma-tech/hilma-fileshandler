import { getConnection, Brackets } from 'typeorm';
import { RequestUserType } from "@hilma/auth-nest";
import { FilePermission } from './filePermission.entity';
import { SPECIAL_ROLES } from '../common/consts';
import { PermissionTypeEnum } from './enums/permissionType.enum';
import { PermissionEnum } from './enums/permission.enum';

export async function permissionsFilter(path: string, user: RequestUserType | null, autoAllow: boolean = false): Promise<boolean> {

    const permissions = await getConnection()
        .createQueryBuilder()
        .select("fp")
        .from(FilePermission, "fp")
        .where("path=:path", { path })
        .andWhere(new Brackets(qb => {
            qb.andWhere("permission_type = :role", { role: PermissionTypeEnum.role })
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

    const userPermissions = permissions.filter(permission => permission.permissionType === PermissionTypeEnum.user);
    
    //user permission - deny
    const denyUserPermission = userPermissions.find(permission => permission.permission === PermissionEnum.deny);
    if (denyUserPermission) {
        return false;
    }

    //user permission - allow
    const allowUserPermission = userPermissions.find(permission => permission.permission === PermissionEnum.allow);
    if (allowUserPermission) {
        return true;
    }

    const rolePermissions = permissions.filter(permission => user && permission.permissionType === PermissionTypeEnum.role && user.roles.includes(permission.roleName));
    
    //role permission - deny
    const denyRolePermission = rolePermissions.find(permission => permission.permission === PermissionEnum.deny);
    if(denyRolePermission){
        return false;
    }

    //role permission - deny
    const allowRolePermission = rolePermissions.find(permission => permission.permission === PermissionEnum.allow);
    if(allowRolePermission){
        return true;
    }


    return false;
};