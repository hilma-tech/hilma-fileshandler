import { Controller } from '@nestjs/common';
import { BaseFileController } from './baseFile.controller';
import { FileService } from '../services/file.service';

@Controller("file")
export class FileController extends BaseFileController {
    constructor(fileService: FileService) {
        super("file", fileService);
    }
}