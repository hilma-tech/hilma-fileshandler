import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { FilePermissionModule } from './fileshandler-mongoose/filePermission/filePemission.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:z10mz10m@localhost/fileshandler"),
    FilePermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
