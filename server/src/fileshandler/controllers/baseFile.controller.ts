import { Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { BaseFilesService } from '../services/baseFiles.service';

export abstract class BaseFileController {
    protected readonly fileService: BaseFilesService;
    protected readonly fileType: string;
    constructor() {
        this.sayHii()
    }

    @Get("*.*")
    getFile(@Req() req: Request, @Res() res: Response) {
        console.log(req.url)
        res.send("<h1> my name is michael  </h1>")
    }

    protected sayHii(): void {
        console.log("hii");
    }
}
