import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { VideoService } from '../services/video.service';

@Controller("video")
export class VidepController extends BaseFileController {
    constructor(videoService: VideoService) {
        super("video", videoService);
    }
}