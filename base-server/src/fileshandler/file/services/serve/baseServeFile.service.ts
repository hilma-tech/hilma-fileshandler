import { BadRequestException, ForbiddenException, NotFoundException, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { RequestUserType } from '../../../common/types/requestUser.type';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { MIME_TYPES } from '../../../common/consts';
import { PermissionsFilterInterface } from '../../../common/interfaces/permissionsFilter.interface';

export class BaseServeFileService {
    protected readonly stream: boolean = false;

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly permissionsFiter: PermissionsFilterInterface,
        private readonly fileType: string
    ) { }

    public validatePath(url: string): number | undefined {
        const mimetypes = Object.keys(MIME_TYPES[this.fileType]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);

        const regex = new RegExp(`^/${this.fileType}/[0-9a-zA-Z]{32}\\.(${mimeTypesWithParenthesis.join("|")})$`);
        if (!url.match(regex)) {
            return 400;
        }
    }

    public async validatePathWithPermissions(url: string, user: RequestUserType, req: Request): Promise<number | undefined> {
        const statusCode = this.validatePath(url);

        if (statusCode) {
            return statusCode;
        }

        if (this.options.autoAllow) {
            return;
        }

        const path = this.getPathForPermission(url);
        if (!this.permissionsFiter) {
            return 403;
        }

        try {
            const allow = await this.permissionsFiter.hasAccess(path, user, req);
            if (!allow) {
                return 403;
            }
        } catch (err) {
            return 500;
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

    public async serve(req: Request, res: Response, user: RequestUserType): Promise<void> {
        const { path } = req;
        try {
            const statusCode = await this.validatePathWithPermissions(path, user, req);
            if (statusCode) {
                res.sendStatus(statusCode);
                return;
            }
        } catch (err) {
            res.sendStatus(500);
            return;
        }

        const absolutePath = this.getAbsolutePath(path);
        const mimetype = this.getMimeType(path);


        res.header('Content-disposition', 'inline');
        res.contentType(mimetype);

        if (this.stream && req.headers.range) {
            this.serveParts(res, req, absolutePath);
        } else {
            this.serveStream(res, absolutePath);
        }
    }

    private serveStream(res: Response, absolutePath: string, options?: { start: number, end: number }): void {
        const stream = fs.createReadStream(absolutePath, options);

        stream.on("error", () => {
            res.sendStatus(500);
        });

        stream.pipe(res);
    }

    private async serveParts(res: Response, req: Request, absolutePath: string): Promise<void> {
        try {
            const stat = await fs.promises.stat(absolutePath);
            const fileSize = stat.size;

            const bytesPrefix = "bytes=";
            const rangesStr = req.headers.range.replace(bytesPrefix, "");
            const [startStr, endStr] = rangesStr.split("-");


            const start = startStr ? parseInt(startStr, 10) : 0;
            const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

            if (start >= end || end >= fileSize) {
                res.sendStatus(416);
                return;
            }

            res.statusCode = 206;

            const resLength = end - start + 1;
            res.header("content-length", resLength.toString());
            res.header("accept-ranges", "bytes");
            res.header("content-range", `bytes ${start}-${end}/${fileSize}`);

            this.serveStream(res, absolutePath, { start, end });

        } catch (err) {
            res.sendStatus(500);
        }
    }
}