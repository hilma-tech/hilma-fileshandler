import { Injectable, } from '@nestjs/common';
import { FilesType, ImageService } from '@hilma/fileshandler-server';
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


    public async saveInSizeWithUserPermission(files: FilesType, clientFileId: number, width: number, userId: string): Promise<string> {
        const path = await this.uploadService.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveUserPermission(path, userId);
        return path;
    }

    public async saveInSizeWithRolePermission(files: FilesType, clientFileId: number, width: number, roleName: string): Promise<string> {
        const path = await this.uploadService.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveRolePermission(path, roleName);
        return path;
    }

    public async saveSingleFileInSizeWithUserPermission(files: FilesType, width: number, userId: string): Promise<string> {
        const path = await this.uploadService.saveSingleFileInSize(files, width);
        this.filePermissionService.saveUserPermission(path, userId);
        return path;
    }

    public async saveSingleFileInSizeWithRolePermission(files: FilesType, width: number, roleName: string): Promise<string> {
        const path = await this.uploadService.saveSingleFileInSize(files, width);
        this.filePermissionService.saveRolePermission(path, roleName);
        return path;
    }



    public async saveMultipleSizesWithUserPermission(files: FilesType, clientFileId: number, userId: string): Promise<string[]> {
        const paths = await this.uploadService.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUserPermission(pathForPermission, userId);
        return paths;
    }

    public async saveMultipleSizesWithRolePermission(files: FilesType, clientFileId: number, roleName: string): Promise<string[]> {
        const paths = await this.uploadService.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolePermission(pathForPermission, roleName);
        return paths;
    }


    public async saveSingleFileInMultipleSizesWithUserPermission(files: FilesType, userId: string): Promise<string[]> {
        const paths = await this.uploadService.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUserPermission(pathForPermission, userId);
        return paths;
    }

    public async saveSingleFileInMultipleSizesWithRolePermission(files: FilesType, roleName: string): Promise<string[]> {
        const paths = await this.uploadService.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolePermission(pathForPermission, roleName);
        return paths;
    }


    public async saveBufferInSizeWithUserPermission(buffer: Buffer, mimetype: string, width: number, userId: string): Promise<string> {
        const path = await this.uploadService.saveBufferInSize(buffer, mimetype, width);
        this.filePermissionService.saveUserPermission(path, userId);
        return path;
    }

    public async saveBufferInSizeWithRolePermission(buffer: Buffer, mimetype: string, width: number, roleName: string): Promise<string> {
        const path = await this.uploadService.saveBufferInSize(buffer, mimetype, width);
        this.filePermissionService.saveRolePermission(path, roleName);
        return path;
    }

    public async saveBufferInMultipleSizesWithUserPermission(buffer: Buffer, mimetype: string, userId: string): Promise<string[]> {
        const paths = await this.uploadService.saveBufferInMultipleSizes(buffer, mimetype);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUserPermission(pathForPermission, userId);
        return paths;
    }

    public async saveBufferInMultipleSizesWithRolePermission(buffer: Buffer, mimetype: string, roleName: string): Promise<string[]> {
        const paths = await this.uploadService.saveBufferInMultipleSizes(buffer, mimetype);
        const pathForPermission = this.uploadService.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolePermission(pathForPermission, roleName);
        return paths;
    }


    public async deleteMultipleSizesWithPermissions(imagePath: string): Promise<void> {
        await this.uploadService.deleteMultipleSizes(imagePath);
        const pathForPermission = this.uploadService.getPathForPermission(imagePath);
        await this.filePermissionService.delete(pathForPermission);
    }
}