import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { ServeFileService } from '../services/serve/serveFile.service';
import { FILE_TYPES } from '../../common/consts';

@Controller(FILE_TYPES.FILE)
export class FileController extends BaseFileController {
    constructor(fileService: ServeFileService) {
        super(fileService);
    }
}