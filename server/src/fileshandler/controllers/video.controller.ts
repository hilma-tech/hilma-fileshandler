import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeVideoService } from '../services/serve/serveVideo.service';

@Controller("video")
export class VideoController extends BaseFileController {
    constructor(videoService: ServeVideoService) {
        super("video", videoService);
    }
}