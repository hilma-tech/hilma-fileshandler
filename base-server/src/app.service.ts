import { Injectable } from '@nestjs/common';
import { ImageService } from './fileshandler/file/services/upload/image.service';

@Injectable()
export class AppService {
  constructor(
    private readonly imageService: ImageService
  ) { }
  
  
}
