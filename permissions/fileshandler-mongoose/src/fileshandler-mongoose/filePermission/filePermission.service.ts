import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilePermission, FilePermissionDocument } from './filePermission.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FilePermissionService {
    constructor(
        @InjectModel(FilePermission.name) private readonly filePermissionModel: Model<FilePermissionDocument>
    ) { }

    public async saveUsersPermission(path: string, userIds: Types.ObjectId[]): Promise<void> {
        const permission = new this.filePermissionModel();
        permission.path = path;
        permission.allowedUsers = userIds;
        await permission.save();
    }

    public async saveRolesPermission(path: string, roles: string[]): Promise<void> {
        const permission = new this.filePermissionModel();
        permission.path = path;
        permission.allowedRoles = roles;
        await permission.save();
    }

    public async addPermissions<T extends keyof Omit<FilePermission, "path" | "_id">>(path: string, permissionName: T, array: FilePermission[T]): Promise<void> {
        await this.filePermissionModel.updateOne({
            path
        }, {
            $addToSet: {
                [permissionName]: array
            }
        }).exec();
    }

    public async removePermissions<T extends keyof Omit<FilePermission, "path" | "_id">>(path: string, permissionName: T, array: FilePermission[T]): Promise<void> {
        await this.filePermissionModel.updateOne({
            path
        }, {
            $pullAll: {
                [permissionName]: array
            }
        }).exec();
    }

}