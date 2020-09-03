import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES, MIME_TYPES } from '../../../common/consts';

@Injectable()
export class ServeImageService extends BaseServeFileService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.IMAGE);
    }

    public validatePath(url: string): void {
        const mimetypes = Object.keys(MIME_TYPES[FILE_TYPES.IMAGE]);
        const mimeTypesWithParenthesis = mimetypes.map(mimetype => `(${mimetype})`);
        const sizeNames = Object.keys(this.options.imageSizes);
        const sizeNamesWithParenthesis = sizeNames.map(sizeName => `(${sizeName})`);

        const regex = new RegExp(`^/${FILE_TYPES.IMAGE}/[0-9a-zA-Z]{32}(\\.(${sizeNamesWithParenthesis.join("|")}))?\\.(${mimeTypesWithParenthesis.join("|")})$`);

        if (!url.match(regex)) {
            throw new BadRequestException();
        }
    }
}