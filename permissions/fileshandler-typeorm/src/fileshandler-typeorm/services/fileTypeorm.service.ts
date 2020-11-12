import { Injectable, Inject } from '@nestjs/common';
import { FILE_TYPES, FILESHANDLER_OPTIONS_SIGN, FileService } from '@hilma/fileshandler-server';
import { BaseTypeormService } from './baseTypeorm.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class FileTypeormService extends BaseTypeormService {
    constructor(
        fileService: FileService,
        filePermissionService: FilePermissionService
        ) {
        super(fileService, filePermissionService);
    }
}