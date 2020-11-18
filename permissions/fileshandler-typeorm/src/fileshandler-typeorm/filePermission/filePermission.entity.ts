import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PermissionEnum } from '../common/enums/permission.enum';
import { PermissionTypeEnum } from '../common/enums/permissionType.enum';

@Entity()
export class FilePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 60
    })
    path: string;

    @Column({
        name: "permission_type",
        type: "enum",
        enum: PermissionTypeEnum,
    })
    permissionType: PermissionTypeEnum;

    @Column({
        type: "varchar",
        length: 30,
        name: "role_name",
        nullable: true,
    })
    roleName: string;

    @Column({
        type: "uuid",
        name: "user_id",
        nullable: true
    })
    userId: string;


    @Column({
        type: "enum",
        enum: PermissionEnum
    })
    permission: PermissionEnum;
}