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
    const imagePath = await this.imageService.save(files, body.imageId);
    const audioPath = await this.audioService.saveSingleFile(files);
    return {
      image: imagePath,
      audio: audioPath,
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
  getInfo(@RequestUser() user: RequestUserType) {
    console.log("hello")
    console.log(user)
  }
}
