import { Module, DynamicModule } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { FilesHandlerOptions } from './interfaces/fIlesHandlerOptions.interface';
import { FILE_TYPES, FILESHANDLER_OPTIONS_SIGN } from './consts';

//controllers
import { ImageController } from './controllers/image.controller';
import { AudioController } from './controllers/audio.controller';
import { FileController } from './controllers/file.controller';
import { VidepController } from './controllers/video.controller';

//services
import { ImageService } from './services/image.service';
import { AudioService } from './services/audio.service';
import { FileService } from './services/file.service';
import { VideoService } from './services/video.service';

@Module({
    controllers: [
        ImageController,
        AudioController,
        FileController,
        VidepController
    ],
    providers: [
        ImageService,
        AudioService,
        FileService,
        VideoService
    ],
    exports: [
        ImageService,
        AudioService,
        FileService,
        VideoService
    ]
})
export class FilesHandlerModule {
    static register(options: FilesHandlerOptions): DynamicModule {

        FilesHandlerModule.createFolders(options);

        return {
            module: FilesHandlerModule,
            providers: [
                {
                    provide: FILESHANDLER_OPTIONS_SIGN,
                    useValue: options
                }
            ]
        }
    }

    static createFolders(options: FilesHandlerOptions): void {
        FILE_TYPES.forEach(fileType => {
            const folderPath = path.resolve(options.folder, fileType);
            fs.mkdirSync(folderPath, { recursive: true });
        });
    }
}
