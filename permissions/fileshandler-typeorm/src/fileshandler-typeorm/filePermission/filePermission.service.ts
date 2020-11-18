import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEnum } from "../common/enums/permission.enum";
import { PermissionTypeEnum } from "../common/enums/permissionType.enum";

import { FilePermission } from './filePermission.entity';

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