import { Injectable, Inject } from '@nestjs/common';

import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';
import { FilePermissionService } from 'src/fileshandler/filePermission/filePermission.service';

@Injectable()
export class FileService extends BaseFilesService {
    constructor(
        @Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions,
        filePermissionService: FilePermissionService
    ) {
        super(options, FILE_TYPES.FILE, filePermissionService);
    }
}