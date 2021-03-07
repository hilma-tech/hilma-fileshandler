import { BaseFilesService, FilesType } from '@hilma/fileshandler-server';
import { FilePermissionService } from '../filePermission/filePermission.service';
import { Types } from 'mongoose';

export abstract class BaseMongooseService {
    constructor(
        protected readonly uploadService: BaseFilesService,
        protected readonly filePermissionService: FilePermissionService
    ) { }

    public async saveWithUsersPermission(files: FilesType, clientFileId: number, userIds: Types.ObjectId[]): Promise<string> {
        const path = await this.uploadService.save(files, clientFileId);
        await this.filePermissionService.saveUsersPermission(path, userIds);
        return path;
    }

    public async saveWithRolesPermission(files: FilesType, clientFileId: number, roleNames: string[]): Promise<string> {
        const path = await this.uploadService.save(files, clientFileId);
        await this.filePermissionService.saveRolesPermission(path, roleNames);
        return path;
    }


    public async saveSingleFileWithUsersPermission(files: FilesType, userIds: Types.ObjectId[]): Promise<string> {
        const path = await this.uploadService.saveSingleFile(files);
        await this.filePermissionService.saveUsersPermission(path, userIds);
        return path;
    }

    public async saveSingleFileWithRolesPermission(files: FilesType, roleNames: string[]): Promise<string> {
        const path = await this.uploadService.saveSingleFile(files);
        await this.filePermissionService.saveRolesPermission(path, roleNames);
        return path;
    }

    public async saveBufferWithUsersPermission(buffer: Buffer, mimetype: string, userIds: Types.ObjectId[]): Promise<string> {
        const path = await this.uploadService.saveBuffer(buffer, mimetype);
        await this.filePermissionService.saveUsersPermission(path, userIds);
        return path;
    }

    public async saveBufferWithRolesPermission(buffer: Buffer, mimetype: string, roleNames: string[]): Promise<string> {
        const path = await this.uploadService.saveBuffer(buffer, mimetype);
        await this.filePermissionService.saveRolesPermission(path, roleNames);
        return path;
    }

    public async deleteWithPermission(filePath: string): Promise<void> {
        await this.uploadService.delete(filePath);
        await this.filePermissionService.deletePermission(filePath);
    }
}