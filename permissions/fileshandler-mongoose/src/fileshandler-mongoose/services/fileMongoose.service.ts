import { Injectable } from '@nestjs/common';
import { FileService } from '@hilma/fileshandler-server';
import { BaseMongooseService } from './baseMongoose.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class FileMongooseService extends BaseMongooseService {
    constructor(
        fileService: FileService,
        filePermissionService: FilePermissionService
    ) {
        super(fileService, filePermissionService);
    }
}