import { Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GetRequestUser } from '../../common/decorators/getRequestUser.decorator';

import { BaseServeFileService } from '../services/serve/baseServeFile.service';
import { RequestUserType } from '../../common/types/requestUser.type';
import { GetJwtAuthInterceptor } from '../../common/decorators/getJwtAuthInterceptor.decorator';

export abstract class BaseFileController {

    constructor(
        protected readonly fileService: BaseServeFileService
    ) { }

    @Get("*")
    @GetJwtAuthInterceptor()
    async getFile(@Req() req: Request, @Res() res: Response, @GetRequestUser() user: RequestUserType): Promise<void> {
        //we await the 'serve' method so that exceptions will be caught by nestjs
        await this.fileService.serve(req, res, user);
    }

}
