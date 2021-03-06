import { Injectable, Inject } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { imageSize } from 'image-size';
import * as sharp from 'sharp';


import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';
import { FilesType } from '../../../common/types/files.type';

@Injectable()
export class ImageService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.IMAGE);
    }

    public saveInSize(files: FilesType, clientFileId: number, width: number): Promise<string> {
        const file = files.find(fileAndExt => fileAndExt.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        return this.saveBufferInSize(file.buffer, file.mimetype, width);
    }

    public async saveBufferInSize(buffer: Buffer, mimetype: string, width: number): Promise<string> {
        const extension = this.findExtension(mimetype);

        if (!extension) {
            throw new Error(`FilesHandler: cannot save file, its mimetype (${mimetype}) is not supported for file type ${FILE_TYPES.IMAGE}.`);
        }

        const fileName = await this.createUniqueFileName(extension);
        const fileAbsolutePath = path.join(this.options.folder, FILE_TYPES.IMAGE, `${fileName}.${extension}`);
        const filePath = `/${FILE_TYPES.IMAGE}/${fileName}.${extension}`;

        const imageDimensions = imageSize(buffer);
        const imageWidth = imageDimensions.width;

        if (width >= imageWidth) {
            await fs.promises.writeFile(fileAbsolutePath, buffer);
        } else {
            await sharp(buffer).resize(width).toFile(fileAbsolutePath);
        }

        return filePath;
    }

    public saveSingleFileInSize(files: FilesType, width: number): Promise<string> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single image in size, image doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.saveInSize(files, clientFileId, width);
    }


    public async saveMultipleSizes(files: FilesType, clientFileId: number): Promise<string[]> {
        if (!this.options.imageSizes) {
            throw new Error("In order to use multiple sizes you must insert the sizes to FilesHandlerModule.register");
        }

        const file = files.find(file => file.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        return this.saveBufferInMultipleSizes(file.buffer, file.mimetype);
    }

    public async saveBufferInMultipleSizes(buffer: Buffer, mimetype: string): Promise<string[]> {
        const extension = this.findExtension(mimetype);
        if (!extension) {
            throw new Error(`FilesHandler: cannot save file, its mimetype (${mimetype}) is not supported for file type ${FILE_TYPES.IMAGE}.`);
        }

        const fileName = await this.createUniqueFileName(extension);

        const imageDimensions = imageSize(buffer);
        const imageWidth = imageDimensions.width;

        const possibleSizes = Object.entries(this.options.imageSizes).filter(([sizeName, width]) => imageWidth >= width);

        if (possibleSizes.length > 0) {
            const savePromises = possibleSizes.map(([sizeName, width]) => {
                const fileAbsolutePath = path.join(this.options.folder, FILE_TYPES.IMAGE, fileName + "." + sizeName + "." + extension);
                return sharp(buffer).resize(width).toFile(fileAbsolutePath);
            });

            await Promise.all(savePromises);

            const filePaths = possibleSizes.map(([sizeName]) => `/${FILE_TYPES.IMAGE}/${fileName}.${sizeName}.${extension}`);
            return filePaths;
        }

        // in case the file is too small, save it in its original size
        const smallestSizeName = this.getSmallestSizeName();
        await this.saveFile(buffer, fileName, `${smallestSizeName}.${extension}`);

        return [`/${FILE_TYPES.IMAGE}/${fileName}.${smallestSizeName}.${extension}`];
    }


    public saveSingleFileInMultipleSizes(files: FilesType): Promise<string[]> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single image in size, image doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.saveMultipleSizes(files, clientFileId);
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


    private getExtensionFromMultipleSizesPath(path: string): string {
        const parts = path.split(".");
        return parts[parts.length - 1];
    }


    public getPathForPermission(pathInSize: string): string {
        const [typeAndName, _, extension] = pathInSize.split(".");
        const pathForPermission = `${typeAndName}.${extension}`;
        return pathForPermission;
    }
}