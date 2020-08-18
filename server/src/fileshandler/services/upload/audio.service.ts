import { Injectable, Scope, Inject } from '@nestjs/common';
import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../consts';

@Injectable({ scope: Scope.REQUEST })
export class AudioService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, FILE_TYPES.AUDIO);
    }
}