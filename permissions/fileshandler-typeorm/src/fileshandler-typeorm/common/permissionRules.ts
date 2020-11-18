import { RequestUserType, SPECIAL_ROLES } from "@hilma/fileshandler-server";

import { PermissionRule } from "./types/permissionRule.type";
import { PermissionTypeEnum } from './enums/permissionType.enum';

export const getAuthenticatedPermissionRules = (user: RequestUserType): PermissionRule[] => ([
    {
        permissionType: PermissionTypeEnum.user
    },
    {
        permissionType: PermissionTypeEnum.role,
        role: user.roles
    },
    {
        permissionType: PermissionTypeEnum.role,
        role: SPECIAL_ROLES.AUTHENTICATED
    },
    {
        permissionType: PermissionTypeEnum.role,
        role: SPECIAL_ROLES.EVERYONE
    }
]);

export const getUnauthenticatedPermissionRules = (): PermissionRule[] => ([
    {
        permissionType: PermissionTypeEnum.role,
        role: SPECIAL_ROLES.UNAUTHENTICATED
    },
    {
        permissionType: PermissionTypeEnum.role,
        role: SPECIAL_ROLES.EVERYONE
    }
]);