import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
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
    users: Types.ObjectId[];

    @Prop({
        type: [String],
        default: undefined
    })
    roles: string[];
}
export const FilePermissionSchema = SchemaFactory.createForClass(FilePermission);

