import { FilesHandlerModule, PERMISSIONS_FILTER, FilesHandlerOptions } from '@hilma/fileshandler-server';
import { DynamicModule, Module } from '@nestjs/common';
import { PermissionsFilterService } from './filePermission/permissionsFilter.service';
import { FilePermissionModule } from './filePermission/filePermission.module';
import { AudioTypeormService } from './services/audioTypeorm.service';
import { FileTypeormService } from './services/fileTypeorm.service';
import { ImageTypeormService } from './services/imageTypeorm.service';
import { VideoTypeormService } from './services/videoTypeorm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilePermission, FilePermissionSchema } from './filePermission/filePermission.schema';

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
export class FileshandlerMongooseModule {
    static register(options: FilesHandlerOptions): DynamicModule {
        if (!options.providers) {
            options.providers = [
                {
                    provide: PERMISSIONS_FILTER,
                    useClass: PermissionsFilterService
                }
            ];

            options.imports = [
                MongooseModule.forFeature([{ name: FilePermission.name, schema: FilePermissionSchema }])
            ];
        }

        return {
            module: FileshandlerMongooseModule,
            global: true,
            imports: [
                FilesHandlerModule.register(options)
            ]
        };
    }
}
