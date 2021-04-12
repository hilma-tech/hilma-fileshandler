import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeImageService } from '../services/serve/serveImage.service';
import { FILE_TYPES } from '../../common/consts';

@Controller(FILE_TYPES.IMAGE)
export class ImageController extends BaseFileController {
    constructor(imageService: ServeImageService) {
        super(imageService);
    }
}