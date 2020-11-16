import { Injectable,  } from '@nestjs/common';
import { AudioService } from '@hilma/fileshandler-server';
import { BaseTypeormService } from './baseTypeorm.service';
import { FilePermissionService } from '../filePermission/filePermission.service';

@Injectable()
export class AudioTypeormService extends BaseTypeormService {
    constructor(
        audioService: AudioService,
        filePermissionService: FilePermissionService
    ) {
        super(audioService, filePermissionService);
    }
}