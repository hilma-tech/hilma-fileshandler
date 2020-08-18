import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FilesHandlerModule } from './fileshandler/fileshandler.module';

@Module({
  imports: [FilesHandlerModule.register({ folder: "/home/michael/filesHandlerUploads/first" })],
  controllers: [AppController]
})
export class AppModule { }