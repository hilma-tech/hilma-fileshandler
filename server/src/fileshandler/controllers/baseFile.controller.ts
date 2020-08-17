import { Get, Req, Res, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express'
import { BaseFilesService } from '../services/baseFiles.service';
import * as fs from 'fs';

export abstract class BaseFileController {
    protected readonly fileService: BaseFilesService;
    protected readonly fileType: string;

    @Get("*")
    async getFile(@Req() req: Request, @Res() res: Response) {
        const { url } = req;

        try {
            await this.fileService.validatePath(url);
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
