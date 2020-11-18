import { Controller, Body, Post, Res } from '@nestjs/common';
import { UserService, User, UseLocalAuth, RequestUser, RequestUserType, UseJwtAuth, Roles } from "@hilma/auth-mongo-nest";
import { Response } from 'express';
import { UseFilesHandler, UploadedFiles, FilesType} from '@hilma/fileshandler-server';
import { ImageMongooseService } from './fileshandler-mongoose/services/imageMongoose.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageMongooseService
  ) { }

  @Post("/hello")
  @UseJwtAuth()
  @UseFilesHandler()
  async getHello(@RequestUser() user: RequestUserType, @UploadedFiles() files: FilesType, @Body() body: any): Promise<any> {
    console.log("here")
    console.log(files)
    const imagePath = await this.imageService.saveSingleFileInMultipleSizesWithRolesPermission(files, ["admin"]);
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
    const userForDB = new User({
      username: body.username,
      password: body.password,
      roles: [
        {
          name: "admin",
          roleKey: "rerere"
        }
      ]
    });
    const user = await this.userService.createUser(userForDB);
  }

  @UseLocalAuth()
  @Post("/login")
  login(@RequestUser() user: RequestUserType, @Res() res: Response): void {
    const body = this.userService.login(user, res);
    res.send(body);
  }


}
