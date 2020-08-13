import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileshandlerModule } from './fileshandler/fileshandler.module';

@Module({
  imports: [FileshandlerModule.register({ storageName: "filehandler-use" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
