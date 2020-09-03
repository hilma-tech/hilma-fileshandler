import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '@hilma/auth-nest';


enum PermissionType {
    role = "role",
    user_id = "user_id"
};

enum Permission {
    allow = "allow",
    deny = "deny"
}

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
        enum: PermissionType
    })
    permissionType: PermissionType;

    @Column({
        name: "role_name",
        length: 30
    })
    roleName: string;

    // @ManyToOne(type => User, user => user.id)
    // user: User;

    @Column({
        type: "enum",
        enum: Permission
    })
    permission: Permission;
}