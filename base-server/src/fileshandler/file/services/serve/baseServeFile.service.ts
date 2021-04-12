import { BadRequestException, ForbiddenException, NotFoundException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { RequestUserType } from '../../../common/types/requestUser.type';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { MIME_TYPES } from '../../../common/consts';
import { PermissionsFilterInterface } from '../../../common/interfaces/permissionsFilter.interface';

import { fileExists } from '../../../common/functions/fileExists';

export abstract class BaseServeFileService {
    protected readonly stream: boolean = false;

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly permissionsFilter: PermissionsFilterInterface,
        private readonly fileType: string
    ) { }

    /**
     * serve the file to the client - a specific part or all of it 
     */
    public async serve(req: Request, res: Response, user: RequestUserType): Promise<void> {
        const { path } = req;

        //this function throws an error if the request is not valid
        await this.validatePathWithPermissions(path, user, req);

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

        stream.on("error", (err) => {
            res.sendStatus(500);
        });

        stream.pipe(res);
    }

    /**
     * this method's goal is sending the file by parts - for audio and video
     * instead of sending the whole file at once, we look at the 'range' header, 
     * which specifies which part of the file to send
     */

    private async serveParts(res: Response, req: Request, absolutePath: string): Promise<void> {
        const stat = await fs.promises.stat(absolutePath)
            .catch(() => {
                throw new InternalServerErrorException();
            });

        const fileSize = stat.size;

        /**
         * range header format: "bytes=start-end"
         * if start doesn't exist - we use the beginning of the file
         * if end doesn't exist - we use the end of the file
         */

        const bytesPrefix = "bytes=";
        const rangesStr = req.headers.range.replace(bytesPrefix, "");
        const [startStr, endStr] = rangesStr.split("-");


        const start = startStr ? parseInt(startStr, 10) : 0;
        const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

        if (start >= end || end >= fileSize) {
            throw new HttpException("Range Not Satisfiable", 416);
        }

        const resLength = end - start + 1;

        res.header("content-length", resLength.toString());
        res.header("accept-ranges", "bytes");
        res.header("content-range", `bytes ${start}-${end}/${fileSize}`);

        res.status(206);

        this.serveStream(res, absolutePath, { start, end });
    }

    protected validatePath(url: string): void {
        const mimetypes = Object.keys(MIME_TYPES[this.fileType]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);

        const regex = new RegExp(`^/${this.fileType}/[0-9a-zA-Z]{32}\\.(${mimeTypesWithParenthesis.join("|")})$`);
        if (!url.match(regex)) {
            throw new BadRequestException();
        }
    }


    //this function exists so other services (like serveImageService), that extends this one could override it
    protected getPathForPermission(path: string): string {
        return path;
    }

    private async validatePathWithPermissions(url: string, user: RequestUserType, req: Request): Promise<void> {
        this.validatePath(url);

        const absolutePath = this.getAbsolutePath(url);
        const exists = await fileExists(absolutePath);

        if (!exists) {
            throw new NotFoundException();
        }

        if (this.options.autoAllow) {
            return;
        }

        if (!this.permissionsFilter) {
            throw new ForbiddenException();
        }

        const path = this.getPathForPermission(url);

        const allow = await this.permissionsFilter.hasAccess(path, user, req);
        if (!allow) {
            throw new ForbiddenException();
        }

    }

    private getAbsolutePath(url: string): string {
        return path.join(this.options.folder, url);
    }

    private getExtension(url: string): string {
        const urlParts = url.split(".");
        return urlParts[urlParts.length - 1];
    }

    private getMimeType(url: string): string {

        const ext = this.getExtension(url);
        const mimetype: string | string[] = MIME_TYPES[this.fileType][ext];

        if (Array.isArray(mimetype)) {
            return mimetype[0];
        }

        return mimetype;
    }
}