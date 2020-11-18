import { Injectable, Inject } from '@nestjs/common';

import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';

@Injectable()
export class VideoService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,) {
        super(options, FILE_TYPES.VIDEO);
    }
}