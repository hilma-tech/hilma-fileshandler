import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesSizeLimitInterceptor } from '../interceptors/filesSizeLimit.interceptor';
import { GetBodyInterceptor } from '../interceptors/getBody.interceptor';

export function UseFilesHandler(maxCount: number = 1) {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor("FilesHandler", maxCount),
            GetBodyInterceptor,
            FilesSizeLimitInterceptor
        )
    );
}