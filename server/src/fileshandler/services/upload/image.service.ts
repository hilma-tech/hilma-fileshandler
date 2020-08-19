import { Injectable, Scope, Inject } from '@nestjs/common';
import * as path from 'path';
import { imageSize } from 'image-size';
import * as sharp from 'sharp';

import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../consts';

@Injectable({ scope: Scope.REQUEST })
export class ImageService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.IMAGE);
    }

    public async saveMultipleSizes(clientFileId: number): Promise<string[]> {
        if (!this.options.imageSizes) {
            throw new Error("In order to use multiple sizes you must insert the sizes to FilesHandlerModule.register");
        }

        const fileAndExt = this.files.find(file => file.file.originalname === clientFileId.toString());

        if (!fileAndExt) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        const fileName = await this.createUniqueFileName(fileAndExt.extension);

        //try to find async option
        const imageDimensions = imageSize(fileAndExt.file.buffer);
        const imageWidth = imageDimensions.width;

        const possibleSizes = Object.entries(this.options.imageSizes).filter(([sizeName, width]) => width <= imageWidth);

        if (possibleSizes.length > 0) {
            const savePromises = possibleSizes.map(([sizeName, width]) => {
                const fileAbsolutePath = path.resolve(this.options.folder, "image", fileName + "." + sizeName + "." + fileAndExt.extension);
                return sharp(fileAndExt.file.buffer).resize(width).toFile(fileAbsolutePath);
            });

            await Promise.all(savePromises);

            const filePaths = possibleSizes.map(([sizeName]) => `/${FILE_TYPES.IMAGE}/${fileName}.${sizeName}.${fileAndExt.extension}`);
            return filePaths;
        }

        const smallestSizeName = this.getSmallestSizeName();
        await this.saveFile(fileAndExt.file.buffer, fileName, `${smallestSizeName}.${fileAndExt.extension}`);

        return [`/${FILE_TYPES.IMAGE}/${fileName}.${smallestSizeName}.${fileAndExt.extension}`];
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
}