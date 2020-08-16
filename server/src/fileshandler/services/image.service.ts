import { Injectable, Scope } from '@nestjs/common';
import { BaseFilesService } from './baseFiles.service';

@Injectable({ scope: Scope.REQUEST })
export class ImageService extends BaseFilesService {
    protected fileType: string = "image";
}