import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesHandlerModule } from './fileshandler/file/fileshandler.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule, RoleModule } from '@hilma/auth-nest';
import configuration from './auth-config/configuration';

import { AppController } from './app.controller';

@Module({
  imports: [
    FilesHandlerModule.register({
      folder: "/home/michael/filesHandlerUploads/first",
      imageSizes: {
        s: 200,
        m: 800,
        l: 1200,
        xl: 1600
      },
      // autoAllow: true
      defaultAllow: true
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    RoleModule
  ],
  controllers: [AppController]
})
export class AppModule { }