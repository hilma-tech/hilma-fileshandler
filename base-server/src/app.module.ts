import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesHandlerModule } from './fileshandler/file/fileshandler.module';
@Module({
  imports: [
    FilesHandlerModule.register({
      folder: "/home/michael/filesHandlerUploads/base-uploads",
      autoAllow: true,
      imageSizes: {
        s: 200,
        m: 400,
        l: 600
      },
      
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
