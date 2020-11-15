import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilePermission } from './filePermission.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: FilePermission.name, schema: FilePermission }])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class FilePermissionModule { }