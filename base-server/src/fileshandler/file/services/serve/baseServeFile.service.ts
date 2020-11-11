import { BadRequestException, ForbiddenException } from '@nestjs/common';
import * as path from 'path';

import { RequestUserType } from '../../../common/types/requestUser.type';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { MIME_TYPES } from '../../../common/consts';
import { Request } from 'express';

export class BaseServeFileService {

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly fileType: string
    ) { }

    public validatePath(url: string): void {
        const mimetypes = Object.keys(MIME_TYPES[this.fileType]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);

        const regex = new RegExp(`^/${this.fileType}/[0-9a-zA-Z]{32}\\.(${mimeTypesWithParenthesis.join("|")})$`);
        if (!url.match(regex)) {
            throw new BadRequestException();
        }
    }

    public async validatePathWithPermissions(url: string, user: RequestUserType, req: Request): Promise<void> {
        this.validatePath(url);

        if (this.options.autoAllow) {
            return;
        }

        const path = this.getPathForPermission(url);
        if (!this.options.permissionsFilter) {
            throw new ForbiddenException();
        }

        const allow = await this.options.permissionsFilter(path, user, req);
        if (!allow) {
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

    //this function exists so other services (like serveImageService), that extends this one could override it
    protected getPathForPermission(path: string): string {
        return path;
    }
}