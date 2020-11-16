import * as mongoose from 'mongoose';
import { RequestUserType } from '@hilma/fileshandler-server';

import { FilePermission, FilePermissionSchema, filePermissionModel } from './filePermission.schema';
// let mongoose = require("mongoose")
const db = mongoose.connection;
// setTimeout(() => {
//     console.log(db)
// }, 1000)
// 
console.log("dlhfki")
// db.once("open", () => {
//     console.log("open")
// })

// db.on("error", () => {
//     console.log("err0r");
// });

export async function permissionsFilter(path: string, user: RequestUserType | null): Promise<boolean> {
    
    // console.log(mongoose.connections.map(item=>item))
    const db = mongoose.connections.find(item => item.name);
    // console.log(db.collections)
    const res = await db.models.FilePermission.find();
    console.log(res)
    // mongoose.connect("mongodb://root:z10mz10m@localhost/fileshandler");
    // const res = await filePermissionModel.find()
    // console.log(res)
    // if (user) {
    //     console.log("before")
        // {
        // $and: [
        // {
        // path
        // },
        // {
        //     $or: [
        //         {
        //             users: Types.ObjectId(user.id)
        //         },
        //         {
        //             roles: user.roles
        //         },
        //         {
        //             roles: ["$authenticated", "$everyone"]
        //         }
        //     ]
        // }
        // ]
        // }, 
        // (err, d) => console.log(d));
        // console.log("here")
        // console.log(permission)
    // } else {

    // }

    // filePermissionModel.findOne({
    //     $and: [
    //         {
    //             path
    //         },
    //         {
    //             $or: [

    //             ]
    //         }
    //     ]
    // });


    return false;
};