import { Injectable, Inject } from '@nestjs/common';
import { FILE_TYPES, FILESHANDLER_OPTIONS_SIGN, FilesHandlerOptions } from '@hilma/fileshandler-server';
import { BaseTypeormService } from './baseTypeorm.service';

@Injectable()
export class FileTypeormService extends BaseTypeormService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.FILE);
    }
}