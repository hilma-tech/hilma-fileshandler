import { PermissionsFilterType } from "../types/permissionsFilter.type";

export interface FilesHandlerOptions {
    folder: string;
    imageSizes?: {
        [sizeName: string]: number;
    };
    
    permissionsOptions: {
        permissionsFilter?: PermissionsFilterType;
        autoAllow?: boolean;
        defaultAllow?: boolean;
    };
}