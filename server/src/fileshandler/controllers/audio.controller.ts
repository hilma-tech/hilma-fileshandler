import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeAudioService } from '../services/serve/serveAudio.service';

@Controller("audio")
export class AudioController extends BaseFileController {
    constructor(audioService: ServeAudioService) {
        super("audio", audioService);
    }
}