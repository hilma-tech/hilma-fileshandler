import { ModuleMetadata } from '@nestjs/common';
import { PermissionsFilterType } from "../types/permissionsFilter.type";

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