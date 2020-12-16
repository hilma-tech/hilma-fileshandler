import { FilesHandlerModule, PERMISSIONS_FILTER, FilesHandlerOptions } from '@hilma/fileshandler-server';
import { DynamicModule, Module } from '@nestjs/common';
import { PermissionsFilterService } from './filePermission/permissionsFilter.service';
import { FilePermissionModule } from './filePermission/filePermission.module';
import { AudioMongooseService } from './services/audioMongoose.service';
import { FileMongooseService } from './services/fileMongoose.service';
import { ImageMongooseService } from './services/imageMongoose.service';
import { VideoMongooseService } from './services/videoMongoose.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilePermission, FilePermissionSchema } from './filePermission/filePermission.schema';

@Module({
    imports: [
        FilePermissionModule
    ],
    providers: [
        ImageMongooseService,
        AudioMongooseService,
        FileMongooseService,
        VideoMongooseService,
    ],
    exports: [
        ImageMongooseService,
        AudioMongooseService,
        FileMongooseService,
        VideoMongooseService,
        FilePermissionModule
    ]
})
export class FilesHandlerMongooseModule {
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
            module: FilesHandlerMongooseModule,
            global: true,
            imports: [
                FilesHandlerModule.register(options)
            ]
        };
    }
}
