import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilePermissionService } from './filePermission.service';
import { FilePermission } from "./filePermission.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([FilePermission]),
    ],
    controllers: [],
    providers: [
        FilePermissionService
    ],
    exports: [FilePermissionService]
})
export class FilePermissionModule { }