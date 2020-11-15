import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilePermission, FilePermissionSchema } from './filePermission.schema';
import { FilePermissionService } from './filePermission.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FilePermission.name, schema: FilePermissionSchema }])
    ],
    controllers: [],
    providers: [
        FilePermissionService
    ],
    exports: []
})
export class FilePermissionModule { }