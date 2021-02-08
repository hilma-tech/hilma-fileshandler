import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PermissionsFilterInterface, RequestUserType, SPECIAL_ROLES } from '@hilma/fileshandler-server';

import { FilePermission, FilePermissionDocument, FilePermissionSchema } from './filePermission.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PermissionsFilterService implements PermissionsFilterInterface {
    constructor(
        @InjectModel(FilePermission.name) private readonly filePermissionModel: Model<FilePermissionDocument>
    ) { }

    async hasAccess(path: string, user: RequestUserType, req: Request): Promise<boolean> {
        if (user) {
            const permission = await this.filePermissionModel.findOne({
                $and: [
                    {
                        path
                    },
                    {
                        $or: [
                            {
                                users: Types.ObjectId(user._id)
                            },
                            {
                                roles: user.roles
                            },
                            {
                                roles: [SPECIAL_ROLES.AUTHENTICATED, SPECIAL_ROLES.EVERYONE]
                            }
                        ]
                    }
                ]
            });
            if (permission) {
                return true;
            }
        } else {
            const permission = await this.filePermissionModel.findOne({
                $and: [
                    {
                        path
                    },
                    {
                        roles: [SPECIAL_ROLES.UNAUTHENTICATED, SPECIAL_ROLES.AUTHENTICATED]
                    }
                ]
            });
            if (permission) {
                return true;
            }
        }
        return false;
    }
}