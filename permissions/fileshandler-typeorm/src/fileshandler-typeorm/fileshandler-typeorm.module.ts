import { FilesHandlerModule, FILESHANDLER_OPTIONS_SIGN } from '@hilma/fileshandler-server';
import { DynamicModule, Module } from '@nestjs/common';
import { permissionsFilter } from './filePermission/permissionsFilter';
import { FilePermissionModule } from './filePermission/filePermission.module';
import { AudioTypeormService } from './services/audioTypeorm.service';
import { FileTypeormService } from './services/fileTypeorm.service';
import { ImageTypeormService } from './services/imageTypeorm.service';
import { VideoTypeormService } from './services/videoTypeorm.service';
import { FilesHandlerTypeormOptions } from './common/interfaces/fIlesHandlerOptions.interface';

@Module({
    imports: [
        FilePermissionModule
    ],
    providers: [
        ImageTypeormService,
        AudioTypeormService,
        FileTypeormService,
        VideoTypeormService,
    ],
    exports: [
        ImageTypeormService,
        AudioTypeormService,
        FileTypeormService,
        VideoTypeormService,
    ]
})
export class FilesHandlerTypeormModule {
    static register(options: FilesHandlerTypeormOptions): DynamicModule {
        if (!options.permissionsFilter) {
            options.permissionsFilter = (path, user, req) => permissionsFilter(path, user, options.defaultAllow);
        }

        return {
            module: FilesHandlerTypeormModule,
            global: true,
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
