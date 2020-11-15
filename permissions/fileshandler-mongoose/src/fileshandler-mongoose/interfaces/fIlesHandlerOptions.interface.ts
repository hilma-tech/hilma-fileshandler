import { FilesHandlerOptions } from '@hilma/fileshandler-server';

export interface FilesHandlerTypeormOptions extends FilesHandlerOptions {
    defaultAllow?: boolean;
}