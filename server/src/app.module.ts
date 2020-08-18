import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FilesHandlerModule } from './fileshandler/fileshandler.module';

@Module({
  imports: [
    FilesHandlerModule.register({
      folder: "/home/michael/filesHandlerUploads/first",
      imageSizes: {
        s: 200,
        m: 800,
        l: 1200,
        xl: 1600
      }
    })
  ],
  controllers: [AppController]
})
export class AppModule { }