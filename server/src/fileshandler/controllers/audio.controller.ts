import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { AudioService } from '../services/audio.service';

@Controller("audio")
export class AudioController extends BaseFileController {
    constructor(audioService: AudioService) {
        super("audio", audioService);
    }
}