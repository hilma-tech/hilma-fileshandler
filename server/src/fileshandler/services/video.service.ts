import { Injectable, Scope } from '@nestjs/common';
import { BaseFilesService } from './baseFiles.service';

@Injectable({ scope: Scope.DEFAULT })
export class VideoService extends BaseFilesService {
    constructor() {
        super("video");
    }
}