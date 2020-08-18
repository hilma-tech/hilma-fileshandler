import { Controller, Get, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilesHandler } from './fileshandler/filesHandler.decorator';

import { ImageService } from './fileshandler/services/upload/image.service';
import { AudioService } from './fileshandler/services/upload/audio.service';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly audioService: AudioService
  ) { }

  @Post("/hello")
  @FilesHandler()
  async getHello(@Body() body: any): Promise<{ image: string, audio: string }> {
    const imagePath = await this.imageService.save(body.imageId);
    const audioPath = await this.audioService.save(body.audioId);

    await this.imageService.update("/image/ZQsixpEncf3cCryT8cDV21dT14cFJ02O.png", body.imageId);
    await this.imageService.delete("/image/ZQsixpEncf3cCryT8cDV21dT14cFJ02O.png");
    return {
      image: imagePath,
      audio: audioPath
    };
  }


  @Get("file")
  getFile(@Res() res: Response): void {
    res.sendFile("/home/michael/filesHanxdlerUploads/first/image/2ovZRXhd8WKJFi2lxiJ62nstYZOOIqo2.png")
  }
}
