import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeAudioService } from '../services/serve/serveAudio.service';
import { FILE_TYPES } from '../../common/consts';

@Controller(FILE_TYPES.AUDIO)
export class AudioController extends BaseFileController {
    constructor(audioService: ServeAudioService) {
        super(audioService);
    }
}