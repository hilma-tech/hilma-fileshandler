import { Injectable,  } from '@nestjs/common';
import { AudioService } from '@hilma/fileshandler-server';
import { BaseMongooseService } from './baseMongoose.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class AudioMongooseService extends BaseMongooseService {
    constructor(
        audioService: AudioService,
        filePermissionService: FilePermissionService
    ) {
        super(audioService, filePermissionService);
    }
}