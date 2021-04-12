import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeVideoService } from '../services/serve/serveVideo.service';
import { FILE_TYPES } from '../../common/consts';

@Controller(FILE_TYPES.VIDEO)
export class VideoController extends BaseFileController {
    constructor(videoService: ServeVideoService) {
        super(videoService);
    }
}