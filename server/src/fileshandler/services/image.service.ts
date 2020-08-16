import { Injectable, Scope } from '@nestjs/common';
import { BaseFilesService } from './baseFiles.service';

@Injectable({ scope: Scope.DEFAULT })
export class ImageService extends BaseFilesService {
    constructor() {
        super("image");
    }
}