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

    @Prop([Types.ObjectId])
    allowedUsers: Types.ObjectId[];

    @Prop([Types.ObjectId])
    deniedUsers: Types.ObjectId[];

    @Prop([String])
    allowedRoles: string[];

    @Prop([String])
    deniedRoles: string[];
}