import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ImageService } from '../services/image.service';

@Controller("image")
export class ImageController extends BaseFileController {
    constructor(imageService: ImageService) {
        super("image", imageService);
    }
}