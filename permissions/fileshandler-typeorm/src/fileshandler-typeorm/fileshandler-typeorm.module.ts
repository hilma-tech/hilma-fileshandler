import { FilesHandlerModule, FILESHANDLER_OPTIONS_SIGN, PERMISSIONS_FILTER } from '@hilma/fileshandler-server';
import { DynamicModule, Module } from '@nestjs/common';
import { PermissionsFilterService } from './filePermission/permissionsFilter.service';
import { FilePermissionModule } from './filePermission/filePermission.module';
import { AudioTypeormService } from './services/audioTypeorm.service';
import { FileTypeormService } from './services/fileTypeorm.service';
import { ImageTypeormService } from './services/imageTypeorm.service';
import { VideoTypeormService } from './services/videoTypeorm.service';
import { FilesHandlerTypeormOptions } from './common/interfaces/fIlesHandlerOptions.interface';
import { DEFAULT_ALLOW } from './common/consts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilePermission } from './filePermission/filePermission.entity';

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
        FilePermissionModule
    ]
})
export class FilesHandlerTypeormModule {
    static register(options: FilesHandlerTypeormOptions): DynamicModule {
        if (!options.providers) {
            options.providers = [
                {
                    provide: PERMISSIONS_FILTER,
                    useClass: PermissionsFilterService
                },
                {
                    provide: DEFAULT_ALLOW,
                    useValue: options.defaultAllow || false
                }
            ];

            options.imports = [
                TypeOrmModule.forFeature([FilePermission])
            ];
        }

        return {
            module: FilesHandlerTypeormModule,
            global: true,
            imports: [
                FilesHandlerModule.register(options)
            ],
            // providers: [
            //     {
            //         provide: FILESHANDLER_OPTIONS_SIGN,
            //         useValue: options
            //     }
            // ]
        }
    }
}
