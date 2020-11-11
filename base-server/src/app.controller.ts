import { Controller, Get, Post, UploadedFiles, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UseFilesHandler } from './fileshandler/common/decorators/filesHandler.decorator';
import { FilesType } from './fileshandler/common/types/files.type'
import { ImageService } from './fileshandler/file/services/upload/image.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImageService
    
    ) { }



  @Post("/hello")
  @UseFilesHandler()
  async getHello(@UploadedFiles() files: FilesType, @Body() body: any): Promise<any> {
    console.log("here")
    console.log(files)
    const imagePath = await this.imageService.saveSingleFileInMultipleSizes(files);
    // const audioPath = await this.audioService.saveSingleFileWithUserPermission(files, user.id);
    // const videoPath = await this.videoService.saveSingleFileWithUserPermission(files, user);
    // console.log(imagePath)
    // console.log(videoPath)
    // console.log(imagePath)
    return {
      image: imagePath[0],
      // audio: audioPath,
      // video: videoPath
    };
  }
}
