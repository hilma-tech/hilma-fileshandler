import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';
import { FilePermission } from 'src/fileshandler/filePermission/filePermission.entity';

@Injectable()
export class AudioService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions, @InjectRepository(FilePermission) filePermissionRepository: Repository<FilePermission>) {
        super(options, FILE_TYPES.AUDIO, filePermissionRepository);
    }
}