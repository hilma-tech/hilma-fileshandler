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
    getFile(@Req() req: Request, @Res() res: Response, @GetRequestUser() user: RequestUserType): void {
        this.fileService.serve(req, res, user);
    }

}
