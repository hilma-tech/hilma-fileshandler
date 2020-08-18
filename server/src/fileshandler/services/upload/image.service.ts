import { Injectable, Scope, Inject } from '@nestjs/common';
import * as sharp from 'sharp';
import {imageSize} from 'image-size';
import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN } from '../../consts';
import { resolve } from 'path';

@Injectable({ scope: Scope.REQUEST })
export class ImageService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, "image");
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
        console.log(fileAndExt.file)
        // const possibleSize = Object.entries(this.options.imageSizes).filter(([sizeName, size]) => )
        const promises = Object.entries(this.options.imageSizes).map(([sizeName, size]) => 
            sharp(fileAndExt.file.buffer)
        );
        return [];
    }

    private imageSize(buffer: Buffer): Promise<any> {
        // return new Promise((resolve, reject) => {
        //     imageSize(buffer, (err, size) => {

        //     })
        // });
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