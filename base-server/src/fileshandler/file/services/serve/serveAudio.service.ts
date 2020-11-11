import { Injectable, Inject } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';

@Injectable()
export class ServeAudioService extends BaseServeFileService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.AUDIO);
    }
}