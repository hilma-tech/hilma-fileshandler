import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetBodyInterceptor } from './interceptors/getBody.interceptor';


export function FilesHandler() {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor("FilesHandler"),
            GetBodyInterceptor
        )
    );
}