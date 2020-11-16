import { Injectable } from '@nestjs/common';
import { FileService } from '@hilma/fileshandler-server';
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