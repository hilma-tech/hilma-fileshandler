import { Injectable, Inject, BadRequestException, Optional } from '@nestjs/common';

import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES, MIME_TYPES, PERMISSIONS_FILTER } from '../../../common/consts';
import { PermissionsFilterInterface } from 'src/fileshandler/common/interfaces/permissionsFilter.interface';

@Injectable()
export class ServeImageService extends BaseServeFileService {
    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,
        @Optional() @Inject(PERMISSIONS_FILTER) permissionsFilter: PermissionsFilterInterface
    ) {
        super(options, permissionsFilter, FILE_TYPES.IMAGE);
    }

    public validatePath(url: string): void {
        const mimetypes = Object.keys(MIME_TYPES[FILE_TYPES.IMAGE]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);
        const sizeNames = this.options.imageSizes ? Object.keys(this.options.imageSizes) : [];
        const sizeNamesWithParenthesis = sizeNames.map(sizeName => `(${sizeName})`);

        const regex = new RegExp(`^/${FILE_TYPES.IMAGE}/[0-9a-zA-Z]{32}(\\.(${sizeNamesWithParenthesis.join("|")}))?\\.(${mimeTypesWithParenthesis.join("|")})$`);

        if (!url.match(regex)) {
            throw new BadRequestException();
        }
    }

    protected getPathForPermission(pathInSize: string): string { // there is a duplication of this function in image.service.ts
        const pathParts = pathInSize.split(".");
        const typeAndName = pathParts[0];
        const extension = pathParts[pathParts.length - 1];
        const pathForPermission = `${typeAndName}.${extension}`;
        return pathForPermission;
    }
}