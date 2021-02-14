import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, BadRequestException, PayloadTooLargeException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';

import { FilesHandlerOptions } from "../interfaces/filesHandlerOptions.interface";
import { FILESHANDLER_OPTIONS_SIGN, FILE_MAX_SIZES } from "../consts";
import { findType } from "../functions/findType";
import { FilesType } from "../types/files.type";
import { BaseExceptionFilter } from "@nestjs/core";


@Injectable()
export class FilesSizeLimitInterceptor implements NestInterceptor {
    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN)
        private readonly options: FilesHandlerOptions
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();
        const files = req.files as FilesType;

        for (const file of files) {
            const fileType = findType(file.mimetype);
            if (!fileType) {
                throw new BadRequestException({ message: "Unsupported file type" });
            }

            const limit = this.options.sizes?.[fileType] || FILE_MAX_SIZES[fileType];

            if (file.size / 1000 > limit) {
                throw new PayloadTooLargeException({ message: "File too big" });
            }
        }


        return next.handle();
    }
}