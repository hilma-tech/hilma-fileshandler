import { Injectable, Inject, Optional } from '@nestjs/common';
import { BaseServeFileService } from './baseServeFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES, PERMISSIONS_FILTER } from '../../../common/consts';
import { PermissionsFilterInterface } from 'src/fileshandler/common/interfaces/permissionsFilter.interface';

@Injectable()
export class ServeVideoService extends BaseServeFileService {
    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,
        @Optional() @Inject(PERMISSIONS_FILTER) permissionsFilter: PermissionsFilterInterface

    ) {
        super(options, permissionsFilter, FILE_TYPES.VIDEO);
    }
}