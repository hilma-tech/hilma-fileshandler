import { Controller, Get, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { FilesHandler } from './fileshandler/filesHandler.decorator';
import { ImageService } from './fileshandler/services/image.service';
import { AudioService } from './fileshandler/services/audio.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImageService,
    private readonly audioService: AudioService
  ) { }

  @Post("/hello")
  @FilesHandler()
  async getHello(@Body() body: any): Promise<string> {
    const imagePath = await this.imageService.saveFile(body.imageId);
    const audioPath = await this.audioService.saveFile(body.audioId);
    console.log(imagePath)
    console.log(audioPath)
    return this.appService.getHello();
  }

  @Get("file")
  getFile(@Res() res: Response):void {
    res.sendFile("/home/michael/filesHanxdlerUploads/first/image/2ovZRXhd8WKJFi2lxiJ62nstYZOOIqo2.png")
  }
}
