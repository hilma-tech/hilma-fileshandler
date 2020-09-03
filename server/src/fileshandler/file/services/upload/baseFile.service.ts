import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as randomstring from 'randomstring';

import { RequestUserType } from "@hilma/auth-nest";

import { MIME_TYPES } from '../../../common/consts'
import { FilesHandlerOptions } from '../../../common/interfaces/fIlesHandlerOptions.interface';
import { FilePermission } from '../../../filePermission/filePermission.entity';
import { PermissionTypeEnum } from "../../../filePermission/enums/permissionType.enum";
import { PermissionEnum } from "../../../filePermission/enums/permission.enum";

export abstract class BaseFilesService {

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly fileType: string,
        protected readonly filePermissionRepository: Repository<FilePermission>
    ) { }

    public async save(files: globalThis.Express.Multer.File[], clientFileId: number): Promise<string> {
        const file = files.find(fileAndExt => fileAndExt.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        const extension = this.findExtension(file.mimetype);
        if (!extension) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, its mimetype (${file.mimetype}) is not supported for file type ${this.fileType}.`);
        }

        const fileName = await this.createUniqueFileName(extension);

        await this.saveFile(file.buffer, fileName, extension);

        const filePath = `/${this.fileType}/${fileName}.${extension}`;
        return filePath;
    }

    public async saveWithUserPermission(files: globalThis.Express.Multer.File[], clientFileId: number, user: RequestUserType): Promise<string> {
        const path = await this.save(files, clientFileId);

        const permission = new FilePermission();
        permission.path = path;
        permission.permission = PermissionEnum.allow;
        permission.permissionType = PermissionTypeEnum.userId;
        permission.roleName = null;
        permission.userId = user.id;
        console.log(permission)

        await this.filePermissionRepository.save(permission);

        return path;
    }



    public saveSingleFile(files: globalThis.Express.Multer.File[]): Promise<string> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single file, file doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.save(files, clientFileId);
    }

    public async delete(filePath: string): Promise<void> {
        const fileAbsolutePath = path.join(this.options.folder, filePath);
        await fs.promises.unlink(fileAbsolutePath);
    }

    /**
     * 
     * explanation: 
     * this method's goal is to create a unique file name
     * the reason this method is async is that we don't want to block the thread from responding to other requests
     * 
     * the reason we use fs.stat instead of fs.exists is that fs.exists is depreacated.
     * In NodeJS's documentation it is recommended to use fs.access, so in order to check if a file exists, 
     * we check if an error was thrown from fs.access
     */

    protected async createUniqueFileName(extension: string): Promise<string> {

        for (let i = 0; i < 50; i++) {
            const name = randomstring.generate();

            const nameExists = await this.fileExists(name, extension);
            if (!nameExists) {
                return name;
            }
        }

        throw new Error(`FilesHandler: cannot create a unique name for ${this.fileType}`);
    }

    protected async fileExists(name: string, extension: string): Promise<boolean> {
        const filePath = path.join(this.options.folder, this.fileType, name + "." + extension);
        try {
            await fs.promises.access(filePath);
            return true;
        } catch (err) {
            return false;
        }
    }

    protected findFirstFileInType(files: globalThis.Express.Multer.File[]): globalThis.Express.Multer.File {
        return files.find(file => this.findExtension(file.mimetype));
    }

    protected async saveFile(buffer: Buffer, fileName: string, fileExtension: string): Promise<void> {
        const fileAbsolutePath = path.join(this.options.folder, this.fileType, fileName + "." + fileExtension);
        await fs.promises.writeFile(fileAbsolutePath, buffer);
    }

    protected findExtension(mimetype: string): string {
        for (let ext in MIME_TYPES[this.fileType]) {
            if (MIME_TYPES[this.fileType][ext] === mimetype || Array.isArray(MIME_TYPES[this.fileType][ext]) && MIME_TYPES[this.fileType][ext].includes(mimetype)) {
                return ext;
            }
        }

        return null;
    }
}