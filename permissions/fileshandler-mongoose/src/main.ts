import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { set } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  set("useCreateIndex", true);
}
bootstrap();
