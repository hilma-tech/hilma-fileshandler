import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { set } from 'mongoose';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  await app.listen(8080);
  set("useCreateIndex", true);
}
bootstrap();
