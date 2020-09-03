import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { BaseFilesService } from './baseFile.service';
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FILESHANDLER_OPTIONS_SIGN, FILE_TYPES } from '../../../common/consts';
import { FilePermission } from '../../../filePermission/filePermission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService extends BaseFilesService {
    constructor(@Inject(FILESHANDLER_OPTIONS_SIGN) options: FilesHandlerOptions, @InjectRepository(FilePermission) filePermissionRepository: Repository<FilePermission>) {
        super(options, FILE_TYPES.VIDEO, filePermissionRepository);
    }
}