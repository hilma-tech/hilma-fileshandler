import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeVideoService } from '../services/serve/serveVideo.service';
import { FILE_TYPES } from '../consts';

@Controller(FILE_TYPES.AUDIO)
export class VideoController extends BaseFileController {
    constructor(videoService: ServeVideoService) {
        super(videoService, FILE_TYPES.VIDEO);
    }
}