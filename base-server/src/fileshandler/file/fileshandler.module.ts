import { Module, DynamicModule } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';

import { FilesHandlerOptions } from '../common/interfaces/filesHandlerOptions.interface';
import { FILE_TYPES, FILESHANDLER_OPTIONS_SIGN } from '../common/consts';



//controllers
import { ImageController } from './controllers/image.controller';
import { AudioController } from './controllers/audio.controller';
import { FileController } from './controllers/file.controller';
import { VideoController } from './controllers/video.controller';

//upload services
import { ImageService } from './services/upload/image.service';
import { AudioService } from './services/upload/audio.service';
import { FileService } from './services/upload/file.service';
import { VideoService } from './services/upload/video.service';

//serve services
import { ServeImageService } from './services/serve/serveImage.service';
import { ServeAudioService } from './services/serve/serveAudio.service';
import { ServeFileService } from './services/serve/serveFile.service';
import { ServeVideoService } from './services/serve/serveVideo.service';

@Module({
    imports: [
        JwtModule.register({})
    ],
    controllers: [
        ImageController,
        AudioController,
        FileController,
        VideoController
    ],
    providers: [
        ImageService,
        AudioService,
        FileService,
        VideoService,
        ServeImageService,
        ServeAudioService,
        ServeFileService,
        ServeVideoService
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

        //find absolute path
        options.folder = FilesHandlerModule.findFolderPath(options.folder);

        FilesHandlerModule.createFolders(options);

        return {
            global: true,
            module: FilesHandlerModule,
            providers: [
                {
                    provide: FILESHANDLER_OPTIONS_SIGN,
                    useValue: options
                },
                ...(options.providers || [])
            ],
            imports: options.imports,
            exports: [
                {
                    provide: FILESHANDLER_OPTIONS_SIGN,
                    useValue: options
                }
            ]
        };
    }

    static createFolders(options: FilesHandlerOptions): void {
        Object.values(FILE_TYPES).forEach(fileType => {
            const folderPath = path.join(options.folder, fileType);
            fs.mkdirSync(folderPath, { recursive: true });
        });
    }

    private static findFolderPath(relativePath: string): string {
        return path.resolve(__dirname, "../../../../../../dist", relativePath);
    }
}
