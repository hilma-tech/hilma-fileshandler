import { BadRequestException, ForbiddenException } from '@nestjs/common';

import * as path from 'path';

import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { MIME_TYPES } from '../../consts';

export class BaseServeFileService {

    constructor(protected readonly options: FilesHandlerOptions, private readonly fileType: string) { }

    public validatePath(url: string): void {
        const mimetypes = Object.keys(MIME_TYPES[this.fileType]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);

        const regex = new RegExp(`^/${this.fileType}/[0-9a-zA-Z]{32}\\.(${mimeTypesWithParenthesis.join("|")})$`);
        if (!url.match(regex)) {
            throw new BadRequestException();
        }
    }

    public async validatePathWithPermissions(url: string) {
        this.validatePath(url);

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