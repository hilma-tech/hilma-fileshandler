import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@hilma/auth-mongo-nest';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { FilesHandlerMongooseModule } from './fileshandler-mongoose/fileshandler-mongoose.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:z10mz10m@localhost/fileshandler", { useNewUrlParser: true, useUnifiedTopology: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    UserModule,
    FilesHandlerMongooseModule.register({
      folder: "/home/michael/filesHandlerUploads/first",
      imageSizes: {
        s: 100,
        m: 400,
        l: 800
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
