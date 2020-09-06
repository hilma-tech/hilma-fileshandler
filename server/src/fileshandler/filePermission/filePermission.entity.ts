import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User, Role } from '@hilma/auth-nest';

import { PermissionEnum } from "./enums/permission.enum";
import { PermissionTypeEnum } from "./enums/permissionType.enum";

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
    // @ManyToOne(type => Role, role => role.name)
    // role: any;

    @Column({
        type: "uuid",
        name: "user_id",
        nullable: true
    })
    userId: string;
    // @ManyToOne(type => User, user => user.id)
    // user: User;


    @Column({
        type: "enum",
        enum: PermissionEnum
    })
    permission: PermissionEnum;
}