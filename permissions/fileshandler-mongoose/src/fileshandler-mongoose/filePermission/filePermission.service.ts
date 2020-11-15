import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilePermission, FilePermissionDocument } from './filePermission.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilePermissionService {
    constructor(@InjectModel(FilePermission.name) private readonly filePermissionModel: Model<FilePermissionDocument>) {
        const fp = new this.filePermissionModel({ path: "image/;cfldscdasd.png" });
        fp.save()
    }

}