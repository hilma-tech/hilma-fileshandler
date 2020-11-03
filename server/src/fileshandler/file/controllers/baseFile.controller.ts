import { Get, Req, Res, NotFoundException, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { RequestUser, RequestUserType, UseJwtInterceptor } from '@hilma/auth-nest';

import { BaseServeFileService } from '../services/serve/baseServeFile.service';
// import { GetUserInterceptor } from '../../common/interceptors/getUser.interceptor';

export abstract class BaseFileController {

    constructor(
        protected readonly fileService: BaseServeFileService,
        protected readonly fileType: string
    ) { }

    @Get("*")
    @UseJwtInterceptor()
    async getFile(@Req() req: Request, @Res() res: Response, @RequestUser() user: RequestUserType) {
        const { url } = req;

        try {
            await this.fileService.validatePathWithPermissions(url, user);
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
