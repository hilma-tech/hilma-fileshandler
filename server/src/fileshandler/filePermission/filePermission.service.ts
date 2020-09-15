import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUserType } from "@hilma/auth-nest";

import { FilePermission } from './filePermission.entity';
import { PermissionEnum } from './enums/permission.enum';
import { PermissionTypeEnum } from './enums/permissionType.enum';
@Injectable()
export class FilePermissionService {
    constructor(
        @InjectRepository(FilePermission) private readonly filePermissionRepository: Repository<FilePermission>
    ) { }

    public async saveUserPermission(path: string, userId: string): Promise<void> {
        const permission = new FilePermission();
        permission.path = path;
        permission.permission = PermissionEnum.allow;
        permission.permissionType = PermissionTypeEnum.user;
        permission.roleName = null;
        permission.userId = userId;
        await this.filePermissionRepository.save(permission);
    }

    public async saveRolePermission(path: string, roleName: string): Promise<void> {
        const permission = new FilePermission();
        permission.path = path;
        permission.permission = PermissionEnum.allow;
        permission.permissionType = PermissionTypeEnum.role;
        permission.roleName = roleName;
        permission.userId = null;
        await this.filePermissionRepository.save(permission);
    }

    public async delete(path: string): Promise<void> {
        await this.filePermissionRepository.delete({ path });
    }
}