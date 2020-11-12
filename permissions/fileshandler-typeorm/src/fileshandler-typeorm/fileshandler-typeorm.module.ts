import { Module } from '@nestjs/common';
import { AudioTypeormService } from './services/audioTypeorm.service';
import { FileTypeormService } from './services/fileTypeorm.service';
import { ImageTypeormService } from './services/imageTypeorm.service';
import { VideoTypeormService } from './services/videoTypeorm.service';

@Module({
    providers: [
        ImageTypeormService,
        AudioTypeormService,
        FileTypeormService,
        VideoTypeormService
    ]
})
export class FilesHandlerTypeormModule { }
