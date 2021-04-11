import { Injectable, Inject, Optional } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES, PERMISSIONS_FILTER } from '../../../common/consts';
import { PermissionsFilterInterface } from 'src/fileshandler/common/interfaces/permissionsFilter.interface';

@Injectable()
export class ServeAudioService extends BaseServeFileService {
    protected stream = true;

    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,
        @Optional() @Inject(PERMISSIONS_FILTER) permissionsFilter: PermissionsFilterInterface
    ) {
        super(options, permissionsFilter, FILE_TYPES.AUDIO);
    }
}