import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesHandlerModule } from './fileshandler/fileshandler.module';

@Module({
  imports: [FilesHandlerModule.register({ folder: "/home/michael/filesHandlerUploads/first" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }