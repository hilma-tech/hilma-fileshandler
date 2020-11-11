import { RequestUserType } from "@hilma/auth-nest";

import { PermissionRule } from "./permissionRule.type";
import { PermissionTypeEnum } from './enums/permissionType.enum';
import { SPECIAL_ROLES } from '../common/consts';

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