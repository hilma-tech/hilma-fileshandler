import { Injectable, } from '@nestjs/common';
import { Types } from 'mongoose';
import { ImageService, FilesType } from '@hilma/fileshandler-server';
import { BaseTypeormService } from './baseTypeorm.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class ImageTypeormService extends BaseTypeormService {
    protected readonly uploadService: ImageService;

    constructor(
        imageService: ImageService,
        filePermissionService: FilePermissionService
    ) {
        super(imageService, filePermissionService);
    }


    public async saveInSizeWithUsersPermission(files: FilesType, clientFileId: number, width: number, userIds: Types.ObjectId[]): Promise<string> {
        const path = await this.uploadService.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveUsersPermission(path, userIds);
        return path;
    }

    public async saveInSizeWithRolesPermission(files: FilesType, clientFileId: number, width: number, roleNames: string[]): Promise<string> {
        const path = await this.uploadService.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveRolesPermission(path, roleNames);
        return path;
    }

    public async saveSingleFileInSizeWithUsersPermission(files: FilesType, width: number, userIds: Types.ObjectId[]): Promise<string> {
        const path = await this.uploadService.saveSingleFileInSize(files, width);
        this.filePermissionService.saveUsersPermission(path, userIds);
        return path;
    }

    public async saveSingleFileInSizeWithRolesPermission(files: FilesType, width: number, roleNames: string[]): Promise<string> {
        const path = await this.uploadService.saveSingleFileInSize(files, width);
        this.filePermissionService.saveRolesPermission(path, roleNames);
        return path;
    }

    public async saveMultipleSizesWithUsersPermission(files: FilesType, clientFileId: number, userIds: Types.ObjectId[]): Promise<string[]> {
        const paths = await this.uploadService.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUsersPermission(pathForPermission, userIds);
        return paths;
    }

    public async saveMultipleSizesWithRolesPermission(files: FilesType, clientFileId: number, roleNames: string[]): Promise<string[]> {
        const paths = await this.uploadService.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolesPermission(pathForPermission, roleNames);
        return paths;
    }

    public async saveSingleFileInMultipleSizesWithUsersPermission(files: FilesType, userIds: Types.ObjectId[]): Promise<string[]> {
        const paths = await this.uploadService.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUsersPermission(pathForPermission, userIds);
        return paths;
    }

    public async saveSingleFileInMultipleSizesWithRolesPermission(files: FilesType, roleNames: string[]): Promise<string[]> {
        const paths = await this.uploadService.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolesPermission(pathForPermission, roleNames);
        return paths;
    }

    public async deleteMultipleSizesWithPermission(imagePath: string): Promise<void> {
        await this.uploadService.deleteMultipleSizes(imagePath);
        const pathForPermission = this.uploadService.getPathForPermission(imagePath);
        await this.filePermissionService.deletePermission(pathForPermission);
    }
}