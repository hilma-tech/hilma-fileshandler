import { Controller, Body, Post, UploadedFiles } from '@nestjs/common';
import { FilesHandler } from './fileshandler/filesHandler.decorator';

import { ImageService } from './fileshandler/services/upload/image.service';
import { AudioService } from './fileshandler/services/upload/audio.service';
import { FileService } from './fileshandler/services/upload/file.service';
import { VideoService } from './fileshandler/services/upload/video.service';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly audioService: AudioService,
    private readonly fileService: FileService,
    private readonly videoService: VideoService
  ) { }

  @Post("/hello")
  @FilesHandler()
  async getHello(@Body() body: any, @UploadedFiles() files: globalThis.Express.Multer.File[]): Promise<any> {

    const imagePath = await this.imageService.save(files, body.imageId);
    const audioPath = await this.audioService.save(files, body.audioId);
    const videoPath = await this.videoService.saveSingleFile(files);

    const filePath = await this.fileService.saveSingleFile(files);
    const multipleImage = await this.imageService.saveSingleFileInMultipleSizes(files);
    console.log(multipleImage)
    console.log(filePath)
    return {
      image: imagePath,
      audio: audioPath,
      video: videoPath
    };
  }


}
