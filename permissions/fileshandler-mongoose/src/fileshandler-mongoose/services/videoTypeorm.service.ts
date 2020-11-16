import { Injectable, Inject } from '@nestjs/common';
import { VideoService } from '@hilma/fileshandler-server';
import { BaseTypeormService } from './baseTypeorm.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class VideoTypeormService extends BaseTypeormService {
    constructor(
        videoService: VideoService,
        filePermissionService: FilePermissionService
    ) {
        super(videoService, filePermissionService);
    }
}