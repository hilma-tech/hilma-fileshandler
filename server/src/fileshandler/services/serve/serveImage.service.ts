import { Injectable, Inject } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN } from '../../consts';

@Injectable()
export class ServeImageService extends BaseServeFileService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions) {
        super(options, "image");
    }
}