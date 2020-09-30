import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetBodyInterceptor } from '../interceptors/getBody.interceptor';
// import { SaveClientFilesInterceptor } from '../interceptors/saveClientFiles.interceptor'

export function UseFilesHandler() {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor("FilesHandler"),
            GetBodyInterceptor,
            // SaveClientFilesInterceptor
        )
    );
}