import { PermissionTypeEnum } from "../enums/permissionType.enum";

export type PermissionRule = { permissionType: PermissionTypeEnum, role?: string | string[] };