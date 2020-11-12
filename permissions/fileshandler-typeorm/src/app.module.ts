import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesHandlerTypeormModule } from './fileshandler-typeorm/fileshandler-typeorm.module';

@Module({
  imports: [
    FilesHandlerTypeormModule.register({
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
