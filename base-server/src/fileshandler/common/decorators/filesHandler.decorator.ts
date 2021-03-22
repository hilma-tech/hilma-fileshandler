import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesSizeLimitInterceptor } from '../interceptors/filesSizeLimit.interceptor';
import { GetBodyInterceptor } from '../interceptors/getBody.interceptor';
import { HandleNoFilesInterceptor } from '../interceptors/handleNoFiles.interceptor';
import { FILES_HANDLER_NAME } from '../consts';

export function UseFilesHandler(maxCount: number = 1) {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor(FILES_HANDLER_NAME, maxCount),
            HandleNoFilesInterceptor,
            GetBodyInterceptor,
            FilesSizeLimitInterceptor
        )
    );
}