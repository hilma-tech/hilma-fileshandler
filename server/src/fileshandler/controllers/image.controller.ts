import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeImageService } from '../services/serve/serveImage.service';

@Controller("image")
export class ImageController extends BaseFileController {
    constructor(imageService: ServeImageService) {
        super("image", imageService);
    }
}