import { PermissionsFilterType } from "../types/permissionsFilter.type";

export interface FilesHandlerOptions {
    folder: string;
    imageSizes?: {
        [sizeName: string]: number;
    };
    permissionsFilter?: PermissionsFilterType;
    autoAllow?: boolean;
    defaultAllow?: boolean;
}