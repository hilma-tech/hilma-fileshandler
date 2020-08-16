import { Injectable, Scope } from '@nestjs/common';
import { BaseFilesService } from './baseFiles.service';

@Injectable({ scope: Scope.REQUEST })
export class AudioService extends BaseFilesService {
    protected fileType: string = "audio";
}