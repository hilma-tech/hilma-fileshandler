import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesHandlerTypeormModule } from './fileshandler-typeorm/fileshandler-typeorm.module';

@Module({
  imports: [FilesHandlerTypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
