import { Injectable, Inject } from '@nestjs/common';
import { VideoService } from '@hilma/fileshandler-server';
import { BaseMongooseService } from './baseMongoose.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class VideoMongooseService extends BaseMongooseService {
    constructor(
        videoService: VideoService,
        filePermissionService: FilePermissionService
    ) {
        super(videoService, filePermissionService);
    }
}