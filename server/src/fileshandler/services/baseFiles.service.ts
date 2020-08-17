import { Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { MIME_TYPES } from '../consts'
import { FilesHandlerOptions } from '../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN } from '../consts';
import * as randomstring from 'randomstring';

export abstract class BaseFilesService {
    protected files: { extension: string, file: any }[];
    protected fileType: string;
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) private readonly options: FilesHandlerOptions) { }

    public setClientFiles(files: any[]): void {
        this.files = [];
        files.forEach(file => {
            for (let ext in MIME_TYPES[this.fileType]) {
                if (MIME_TYPES[this.fileType][ext] === file.mimetype || Array.isArray(MIME_TYPES[this.fileType][ext]) && MIME_TYPES[this.fileType][ext].includes(file.mimetype)) {
                    this.files.push({
                        extension: ext,
                        file
                    });
                }
            }
        });
    }

    public async saveFile(fileClientId: number) {
        const fileAndExt = this.files.find(fileAndExt => fileAndExt.file.originalname === fileClientId.toString());

        if (!fileAndExt) {
            throw new Error(`FilesHandler: cannot save file ${fileClientId}, file doesn't exist`);
        }

        const fileName = await this.createUniqueFileName(fileAndExt.extension);
        const fileAbsolutePath = path.resolve(this.options.folder, this.fileType, fileName + "." + fileAndExt.extension);

        await fs.promises.writeFile(fileAbsolutePath, fileAndExt.file.buffer);

        const filePath = `/${this.fileType}/${fileName}.${fileAndExt.extension}`;
        return filePath;
    }

    /**
     * 
     * explanation: 
     * this method's goal is to create a unique file name
     * the reason this method is async is that we don't want to block the thread from responding to other requests
     * 
     * the reason we use fs.stat instead of fs.exists is that fs.exists is depreacated.
     * In NodeJS's documentation it is recommended to use fs.access, so in order to check if a file exists, 
     * we check if an error was thrown from fs.access
     */

    private async createUniqueFileName(extension: string): Promise<string> {

        for (let i = 0; i < 50; i++) {
            const name = randomstring.generate();
            const filePath = path.resolve(this.options.folder, this.fileType, name + "." + extension);

            try {
                await fs.promises.access(filePath);
            } catch (err) {
                return name;
            }
        }

        throw new Error(`FilesHandler: cannot create a unique name for ${this.fileType}`);
    }

    public async validatePath(url: string) {
        const mimetypes = Object.keys(MIME_TYPES[this.fileType]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);

        const regex = new RegExp(`^/${this.fileType}/[0-9a-zA-Z]{32}.(${mimeTypesWithParenthesis.join("|")})$`);

        if (!url.match(regex)) {
            throw new BadRequestException();
        }

        if (false) { /// records permissins
            throw new ForbiddenException();
        }
    }

    public getAbsolutePath(url: string): string {
        return path.join(this.options.folder, url);
    }

    public getExtension(url: string): string {
        const urlParts = url.split(".");
        return urlParts[urlParts.length - 1];
    }

    public getMimeType(url: string): string {

        const ext = this.getExtension(url);
        const mimetype: string | string[] = MIME_TYPES[this.fileType][ext];

        if (Array.isArray(mimetype)) {
            return mimetype[0];
        }

        return mimetype;
    }
}