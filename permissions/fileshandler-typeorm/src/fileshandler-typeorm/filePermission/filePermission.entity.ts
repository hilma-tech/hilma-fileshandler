import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PermissionEnum, PermissionTypeEnum } from '@hilma/fileshandler-server';

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