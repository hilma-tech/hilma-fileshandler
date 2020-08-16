import { Injectable, Scope } from '@nestjs/common';
import { BaseFilesService } from './baseFiles.service';

@Injectable({ scope: Scope.REQUEST })
export class FileService extends BaseFilesService {
    protected fileType: string = "file";
}