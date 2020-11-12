import { FilesHandlerModule, FilesHandlerOptions, FILESHANDLER_OPTIONS_SIGN } from '@hilma/fileshandler-server';
import { DynamicModule, Module } from '@nestjs/common';
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
export class FilesHandlerTypeormModule {
    static register(options: FilesHandlerOptions): DynamicModule {
        return {
            module: FilesHandlerModule,
            imports: [
                FilesHandlerModule.register(options)
            ],
            providers: [
                {
                    provide: FILESHANDLER_OPTIONS_SIGN,
                    useValue: options
                }
            ]
        }
    }
}
