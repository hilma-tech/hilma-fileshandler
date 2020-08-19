import { Controller, Get, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilesHandler } from './fileshandler/filesHandler.decorator';

import { ImageService } from './fileshandler/services/upload/image.service';
import { AudioService } from './fileshandler/services/upload/audio.service';
import { FileService } from './fileshandler/services/upload/file.service';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly audioService: AudioService,
    private readonly fileService: FileService
  ) { }

  @Post("/hello")
  @FilesHandler()
  async getHello(@Body() body: any): Promise<{ image?: string, audio?: string }> {
    const imagePath = await this.imageService.saveSingleFileInMultipleSizes();
    // const audioPath = await this.audioService.save(body.audioId);

    return {
      image: imagePath[1],
      // audio: audioPath
    };
  }


  @Get("file")
  getFile(@Res() res: Response): void {
    res.sendFile("/home/michael/filesHanxdlerUploads/first/image/2ovZRXhd8WKJFi2lxiJ62nstYZOOIqo2.png")
  }
}
