import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesHandler } from './fileshandler/filesHandler.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/hello")
  @FilesHandler()
  getHello(@Body() body: any): string {
    return this.appService.getHello();
  }
}
