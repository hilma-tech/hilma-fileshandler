import { Controller, Body, Post, Res, Req, Get } from '@nestjs/common';
import { UserService, User, UseLocalAuth, RequestUser, RequestUserType, UseJwtAuth, Roles } from "@hilma/auth-nest";


import { UploadedFiles, UseFilesHandler, ImageService, AudioService, FileService, VideoService } from './index';
import { Response } from 'express';
import { FilesType } from './fileshandler/common/types/files.type';

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
  @UseFilesHandler()
  async getHello(@RequestUser() user: RequestUserType, @UploadedFiles() files: FilesType, @Body() body: any): Promise<any> {
    console.log("here")
    console.log(files)
    const imagePath = await this.imageService.saveSingleFileInMultipleSizesWithRolePermission(files, "admin");
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
    const b = await this.imageService.getAllImageSizes("/image/7FsXgDV6PkvYqmlCpOdSiR4LZXLiEE11.m.png");
    console.log(b);
  }

  @Post("/multiple")
  @UseFilesHandler()
  async multiple(@UploadedFiles() files: FilesType, @Body() body: any): Promise<any> {
    console.log(files);
    const path = await this.imageService.save(files, body.imageId);
    console.log(path)
    console.log("here")
    return { success: true };
    // const res = await Promise.all(body.map(item => this.imageService.saveWithRolePermission(files, item.id, "admin")))
    // console.log(res);
    // console.log(body);
  }
}
