import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ImageService } from '../services/image.service';

@Controller("image")
export class ImageController extends BaseFileController {
    protected readonly fileType = "image";

    constructor(protected readonly fileService: ImageService) {
        super();
    }

    protected sayHii(): void {
        console.log("byyye")
    }
}