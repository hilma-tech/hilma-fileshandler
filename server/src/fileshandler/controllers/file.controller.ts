import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeFileService } from '../services/serve/serveFile.service';

@Controller("file")
export class FileController extends BaseFileController {
    constructor(fileService: ServeFileService) {
        super("file", fileService);
    }
}