import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';

//services
import { ImageService } from "../services/upload/image.service";
import { AudioService } from "../services/upload/audio.service";
import { VideoService } from "../services/upload/video.service";
import { FileService } from "../services/upload/file.service";


@Injectable()
export class SaveClientFilesInterceptor implements NestInterceptor {
    constructor(
        private readonly imageService: ImageService,
        private readonly audioService: AudioService,
        private readonly videoService: VideoService,
        private readonly fileService: FileService
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        // this.imageService.setClientFiles(req.files as any[]);
        // this.audioService.setClientFiles(req.files as any[]);
        // this.fileService.setClientFiles(req.files as any[]);
        // this.videoService.setClientFiles(req.files as any[]);

        return next.handle();
    }
}