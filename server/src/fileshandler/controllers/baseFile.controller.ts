import { Get, Req, Res, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { BaseServeFileService } from '../services/serve/baseServeFile.service';

export abstract class BaseFileController {

    constructor(
        protected readonly fileType: string,
        protected readonly fileService: BaseServeFileService
    ) { }

    @Get("*")
    async getFile(@Req() req: Request, @Res() res: Response) {
        const { url } = req;

        try {
            await this.fileService.validatePathWithPermissions(url);
        } catch (err) {
            throw err;
        }

        const absolutePath = this.fileService.getAbsolutePath(url);
        const mimetype = this.fileService.getMimeType(url);
        const extension = this.fileService.getExtension(url);
        try {
            const data = await fs.promises.readFile(absolutePath);
            res.header('Content-disposition', `inline; filename=thi3is@fi1E.${extension}`);
            res.contentType(mimetype);
            res.send(data);
        } catch (err) {
            throw new NotFoundException();
        }
    }

}
