import { ModuleMetadata } from '@nestjs/common';

export interface FilesHandlerOptions {
    folder: string;
    imageSizes?: {
        [sizeName: string]: number;
    };

    // permissionsFilter?: PermissionsFilterType;
    imports?: ModuleMetadata["imports"]
    providers?: ModuleMetadata["providers"];
    autoAllow?: boolean;
}