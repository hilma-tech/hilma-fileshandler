import { ModuleMetadata } from '@nestjs/common';
import { FILE_MAX_SIZES } from '../consts';

export interface FilesHandlerOptions {
    folder: string;
    imageSizes?: {
        [sizeName: string]: number;
    };

    imports?: ModuleMetadata["imports"]
    providers?: ModuleMetadata["providers"];
    autoAllow?: boolean;

    sizes?: Partial<typeof FILE_MAX_SIZES>;
}