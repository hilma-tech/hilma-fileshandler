import { Controller, Get, Post, UploadedFiles, Body, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { UseFilesHandler } from './fileshandler/common/decorators/filesHandler.decorator';
import { FilesType } from './fileshandler/common/types/files.type'
import { ImageService } from './fileshandler/file/services/upload/image.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImageService,
    private readonly httpService: HttpService
  ) { }



  @Post("/hello")
  @UseFilesHandler()
  async getHello(@UploadedFiles() files: FilesType, @Body() body: any): Promise<any> {
    // console.log("here")
    // console.log(files)
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

  @Post("/multiple")
  @UseFilesHandler(200)
  async getMultiple(@UploadedFiles() files: FilesType): Promise<any> {
    // console.log(files[0].size)
    // const imagePath = [] //await this.imageService.saveSingleFileInMultipleSizes(files);

    return {
      // image: imagePath[0],
      // audio: audioPath,
      // video: videoPath
    };
  }

  @Get("/upload-buffer")
  async uploadBuffer(): Promise<any> {
    const url = "http://t.wallpaperweb.org/wallpaper/animals/1600x1200/Underwater_Wallpaper_36.jpg";
    const res = await this.httpService.get<Buffer>(url, { responseType: "arraybuffer" }).toPromise();
    const { data } = res;
    console.log(res.headers)
    const path = await this.imageService.saveBufferInSize(res.data, res.headers["content-type"], 400)
    console.log(path)
    return "<h1 style='text-align: center'>hello buffer</h1>";
  }
}
