import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesHandlerTypeormModule } from './fileshandler-typeorm/fileshandler-typeorm.module';
import { FilePermission } from './fileshandler-typeorm/filePermission/filePermission.entity';

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

    }),
    TypeOrmModule.forRoot({
      database: "nest_fileshandler",
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "z10mz10m",
      synchronize: true,
      entities: [
        FilePermission
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
