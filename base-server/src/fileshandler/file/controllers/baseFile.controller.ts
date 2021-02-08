import { Get, Req, Res, NotFoundException, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { GetRequestUser } from '../../common/decorators/getRequestUser.decorator';

import { BaseServeFileService } from '../services/serve/baseServeFile.service';
import { RequestUserType } from '../../common/types/requestUser.type';
import { GetJwtAuthInterceptor } from '../../common/decorators/getJwtAuthInterceptor.decorator';

export abstract class BaseFileController {

    constructor(
        protected readonly fileService: BaseServeFileService,
        protected readonly fileType: string
    ) { }

    @Get("*")
    @GetJwtAuthInterceptor()
    async getFile(@Req() req: Request, @Res() res: Response, @GetRequestUser() user: RequestUserType) {
        const { path } = req;

        try {
            await this.fileService.validatePathWithPermissions(path, user, req);
        } catch (err) {
            throw err;
        }

        const absolutePath = this.fileService.getAbsolutePath(path);
        const mimetype = this.fileService.getMimeType(path);
        const extension = this.fileService.getExtension(path);
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
