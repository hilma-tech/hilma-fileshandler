import { Injectable, Inject } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';
import { imageSize } from 'image-size';
import * as sharp from 'sharp';


import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';
import { FilePermissionService } from '../../../filePermissionMysql/filePermission.service';
import { FilesType } from '../../../common/types/files.type';

@Injectable()
export class ImageService extends BaseFilesService {
    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,
        filePermissionService: FilePermissionService
    ) {
        super(options, FILE_TYPES.IMAGE, filePermissionService);
    }

    public async saveInSize(files: FilesType, clientFileId: number, width: number): Promise<string> {
        const file = files.find(fileAndExt => fileAndExt.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        const extension = this.findExtension(file.mimetype);

        if (!extension) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, its mimetype (${file.mimetype}) is not supported for file type ${FILE_TYPES.IMAGE}.`);
        }

        const fileName = await this.createUniqueFileName(extension);
        const fileAbsolutePath = path.join(this.options.folder, FILE_TYPES.IMAGE, `${fileName}.${extension}`);
        const filePath = `/${FILE_TYPES.IMAGE}/${fileName}.${extension}`;

        const imageDimensions = imageSize(file.buffer);
        const imageWidth = imageDimensions.width;

        if (width >= imageWidth) {
            await fs.promises.writeFile(fileAbsolutePath, file.buffer);
        } else {
            await sharp(file.buffer).resize(width).toFile(fileAbsolutePath);
        }

        return filePath;
    }

    public async saveInSizeWithUserPermission(files: FilesType, clientFileId: number, width: number, userId: string): Promise<string> {
        const path = await this.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveUserPermission(path, userId);
        return path;
    }

    public async saveInSizeWithRolePermission(files: FilesType, clientFileId: number, width: number, roleName: string): Promise<string> {
        const path = await this.saveInSize(files, clientFileId, width);
        this.filePermissionService.saveRolePermission(path, roleName);
        return path;
    }

    public saveSingleFileInSize(files: FilesType, width: number): Promise<string> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single image in size, image doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.saveInSize(files, clientFileId, width);
    }

    public async saveSingleFileInSizeWithUserPermission(files: FilesType, width: number, userId: string): Promise<string> {
        const path = await this.saveSingleFileInSize(files, width);
        this.filePermissionService.saveUserPermission(path, userId);
        return path;
    }

    public async saveSingleFileInSizeWithRolePermission(files: FilesType, width: number, roleName: string): Promise<string> {
        const path = await this.saveSingleFileInSize(files, width);
        this.filePermissionService.saveRolePermission(path, roleName);
        return path;
    }

    public async saveMultipleSizes(files: FilesType, clientFileId: number): Promise<string[]> {
        if (!this.options.imageSizes) {
            throw new Error("In order to use multiple sizes you must insert the sizes to FilesHandlerModule.register");
        }

        const file = files.find(file => file.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        const extension = this.findExtension(file.mimetype);
        if (!extension) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, its mimetype (${file.mimetype}) is not supported for file type ${FILE_TYPES.IMAGE}.`);
        }

        const fileName = await this.createUniqueFileName(extension);

        //try to find async option
        const imageDimensions = imageSize(file.buffer);
        const imageWidth = imageDimensions.width;

        const possibleSizes = Object.entries(this.options.imageSizes).filter(([sizeName, width]) => imageWidth >= width);

        if (possibleSizes.length > 0) {
            const savePromises = possibleSizes.map(([sizeName, width]) => {
                const fileAbsolutePath = path.join(this.options.folder, FILE_TYPES.IMAGE, fileName + "." + sizeName + "." + extension);
                return sharp(file.buffer).resize(width).toFile(fileAbsolutePath);
            });

            await Promise.all(savePromises);

            const filePaths = possibleSizes.map(([sizeName]) => `/${FILE_TYPES.IMAGE}/${fileName}.${sizeName}.${extension}`);
            return filePaths;
        }

        const smallestSizeName = this.getSmallestSizeName();
        await this.saveFile(file.buffer, fileName, `${smallestSizeName}.${extension}`);

        return [`/${FILE_TYPES.IMAGE}/${fileName}.${smallestSizeName}.${extension}`];
    }

    public async saveMultipleSizesWithUserPermission(files: FilesType, clientFileId: number, userId: string): Promise<string[]> {
        const paths = await this.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUserPermission(pathForPermission, userId);
        return paths;
    }

    public async saveMultipleSizesWithRolePermission(files: FilesType, clientFileId: number, roleName: string): Promise<string[]> {
        const paths = await this.saveMultipleSizes(files, clientFileId);
        const pathForPermission = this.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolePermission(pathForPermission, roleName);
        return paths;
    }

    public saveSingleFileInMultipleSizes(files: FilesType): Promise<string[]> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single image in size, image doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.saveMultipleSizes(files, clientFileId);
    }

    public async saveSingleFileInMultipleSizesWithUserPermission(files: FilesType, userId: string): Promise<string[]> {
        const paths = await this.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.getPathForPermission(paths[0]);
        await this.filePermissionService.saveUserPermission(pathForPermission, userId);
        return paths;
    }

    public async saveSingleFileInMultipleSizesWithRolePermission(files: FilesType, roleName: string): Promise<string[]> {
        const paths = await this.saveSingleFileInMultipleSizes(files);
        const pathForPermission = this.getPathForPermission(paths[0]);
        await this.filePermissionService.saveRolePermission(pathForPermission, roleName);
        return paths;
    }

    public async deleteMultipleSizes(imagePath: string): Promise<void> {
        const imagePathParts = imagePath.split("/");
        const imageNameAndExt = imagePathParts[2];
        const imageNameAndExtParts = imageNameAndExt.split(".");

        const imageName = imageNameAndExtParts[0];
        const imageExt = imageNameAndExtParts[imageNameAndExtParts.length - 1];

        const sizeNames = Object.keys(this.options.imageSizes);

        const deletePromises = sizeNames.map(sizeName =>
            super.fileExists(imageName, `${sizeName}.${imageExt}`)
                .then(exists => {
                    if (exists) {
                        const imageSizePath = path.join(this.options.folder, FILE_TYPES.IMAGE, `${imageName}.${sizeName}.${imageExt}`);
                        return fs.promises.unlink(imageSizePath);
                    }
                })
        );

        await Promise.all(deletePromises);
    }

    public async deleteMultipleSizesWithPermissions(imagePath: string): Promise<void> {
        await this.deleteMultipleSizes(imagePath);
        const pathForPermission = this.getPathForPermission(imagePath);
        await this.filePermissionService.delete(pathForPermission);
    }

    public async getAllImageSizes(imageSizePath: string): Promise<string[]> {
        const imageName = this.getNameFromPath(imageSizePath);
        const extension = this.getExtensionFromMultipleSizesPath(imageSizePath);
        const extensionsInSizes: string[] = [];
        for (let sizeName in this.options.imageSizes) {
            extensionsInSizes.push(`${sizeName}.${extension}`);
        }

        const existsPromises = extensionsInSizes.map(ext => super.fileExists(imageName, ext));
        const existsArr = await Promise.all(existsPromises);

        const paths = extensionsInSizes.map(ext => `/${FILE_TYPES.IMAGE}/${imageName}.${ext}`);
        const existingPaths = paths.filter((path, index) => existsArr[index]);

        return existingPaths;
    }

    private getSmallestSizeName(): string {
        const sizeNames = Object.keys(this.options.imageSizes);
        let smallestSizeName = sizeNames[0];

        sizeNames.forEach(sizeName => {
            if (this.options.imageSizes[sizeName] < this.options.imageSizes[smallestSizeName]) {
                smallestSizeName = sizeName;
            }
        });

        return smallestSizeName;
    }


    private getExtensionsWithSizes(extension: string): string[] {
        const extensions = [extension];
        if (this.options.imageSizes) {
            Object.keys(this.options.imageSizes).forEach(sizeName => {
                extensions.push(`${sizeName}.${extension}`);
            });
        }

        return extensions;
    }

    protected async fileExists(name: string, extension: string): Promise<boolean> {
        const extensions = this.getExtensionsWithSizes(extension);
        const existsPromises = extensions.map(ext => super.fileExists(name, ext));
        const existsBySize = await Promise.all(existsPromises);
        const exists = existsBySize.some(sizeExists => sizeExists);

        return exists;
    }

    private getPathForPermission(pathInSize: string): string {
        const [typeAndName, _, extension] = pathInSize.split(".");
        const pathForPermission = `${typeAndName}.${extension}`;
        return pathForPermission;
    }

    private getExtensionFromMultipleSizesPath(path: string): string {
        const parts = path.split(".");
        return parts[parts.length - 1];
    }
}