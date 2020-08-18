import { Injectable, Inject } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../consts';

@Injectable()
export class ServeVideoService extends BaseServeFileService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.VIDEO);
    }
}