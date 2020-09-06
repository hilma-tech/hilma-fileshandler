import { Controller, Body, Post, UploadedFiles, Res, Req } from '@nestjs/common';
import { UserService, User, UseLocalAuth, RequestUser, RequestUserType, UseJwtAuth, Roles } from "@hilma/auth-nest";

import { FilesHandler } from './fileshandler/common/decorators/filesHandler.decorator';

import { ImageService } from './fileshandler/file/services/upload/image.service';
import { AudioService } from './fileshandler/file/services/upload/audio.service';
import { FileService } from './fileshandler/file/services/upload/file.service';
import { VideoService } from './fileshandler/file/services/upload/video.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly audioService: AudioService,
    private readonly fileService: FileService,
    private readonly videoService: VideoService,
    private readonly userService: UserService
  ) { }

  @Post("/hello")
  @UseJwtAuth()
  @FilesHandler()
  async getHello(@RequestUser() user: RequestUserType, @UploadedFiles() files: globalThis.Express.Multer.File[], @Body() body: any): Promise<any> {
    const imagePath = await this.imageService.saveSingleFileInMultipleSizesWithUserPermission(files, user);
    // const audioPath = await this.audioService.saveSingleFileWithUserPermission(files, user);
    console.log(imagePath)
    return {
      image: imagePath[0],
      // audio: audioPath,
      // video: videoPath
    };
  }

  @Post("/signUp")
  async signUp(@Body() body: { username: string, password: string }): Promise<void> {
    console.log(body)
    console.log("sign up")
    const userForDB = new User();
    userForDB.username = body.username;
    userForDB.password = body.password;
    userForDB.roles = [{ id: 1, name: "admin", description: "admin" }];
    const user = await this.userService.createUser(userForDB);
  }

  @UseLocalAuth()
  @Post("/login")
  login(@RequestUser() user: RequestUserType, @Res() res: Response): void {
    const body = this.userService.login(user, res);
    res.send(body);
  }


  @UseJwtAuth()
  @Post("/info")
  async getInfo(@RequestUser() user: RequestUserType): Promise<void> {
    console.log("hello")
    console.log(user)
    const a = await this.imageService.getAllImageSizes("/image/Pq42HgPDdJYo2CCH0jyL07malmmI29nM.m.png");
    console.log(a);
    const b = await  this.imageService.getAllImageSizes("/image/7FsXgDV6PkvYqmlCpOdSiR4LZXLiEE11.m.png");
    console.log(b);
  }
}
