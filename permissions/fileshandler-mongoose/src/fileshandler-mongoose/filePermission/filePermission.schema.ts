import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FilePermissionDocument = Document & FilePermission;

@Schema()
export class FilePermission {
    _id: string;

    @Prop({
        unique: true,
        type: "string",
        required: true
    })
    path: string;

    @Prop({
        type: [Types.ObjectId],
        default: undefined
    })
    allowedUsers: Types.ObjectId[];

    @Prop({
        type: [Types.ObjectId],
        default: undefined
    })
    deniedUsers: Types.ObjectId[];

    @Prop({
        type: [String],
        default: undefined
    })
    allowedRoles: string[];

    @Prop({
        type: [String],
        default: undefined
    })
    deniedRoles: string[];
}

export const FilePermissionSchema = SchemaFactory.createForClass(FilePermission);