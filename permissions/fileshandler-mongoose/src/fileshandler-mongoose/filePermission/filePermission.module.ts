import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilePermission, FilePermissionSchema } from './filePermission.schema';
import { FilePermissionService } from './filePermission.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ schema: FilePermissionSchema, name: FilePermission.name }])
    ],
    controllers: [],
    providers: [
        FilePermissionService,
    ],
    exports: [FilePermissionService]
})
export class FilePermissionModule { }