import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FilePermissionDocument = mongoose.Document & FilePermission;

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
        type: [mongoose.Types.ObjectId],
        default: undefined
    })
    users: any[];

    @Prop({
        type: [String],
        default: undefined
    })
    roles: string[];
}
export const FilePermissionSchema = SchemaFactory.createForClass(FilePermission);

