import * as fs from 'fs';
import * as path from 'path';
import * as randomstring from 'randomstring';

import { MIME_TYPES } from '../../../common/consts';
import { FilesHandlerOptions } from '../../../common/interfaces/filesHandlerOptions.interface';
import { FilesType } from '../../../common/types/files.type';

import { fileExists } from '../../../common/functions/fileExists';

export abstract class BaseFilesService {

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly fileType: string,
    ) { }

    public save(files: FilesType, clientFileId: number): Promise<string> {
        const file = files.find(fileAndExt => fileAndExt.originalname === clientFileId.toString());

        if (!file) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        return this.saveBuffer(file.buffer, file.mimetype)
    }

    public async saveBuffer(buffer: Buffer, mimetype: string): Promise<string> {
        const extension = this.findExtension(mimetype);
        if (!extension) {
            throw new Error(`FilesHandler: cannot save file, its mimetype (${mimetype}) is not supported for file type ${this.fileType}.`);
        }

        const fileName = await this.createUniqueFileName(extension);

        await this.saveFile(buffer, fileName, extension);

        const filePath = `/${this.fileType}/${fileName}.${extension}`;
        return filePath;
    }

    public saveSingleFile(files: FilesType): Promise<string> {
        const file = this.findFirstFileInType(files);
        if (!file) {
            throw new Error(`FilesHandler: cannot save a single ${this.fileType}, file doesn't exist`);
        }

        const clientFileId = parseInt(file.originalname);
        return this.save(files, clientFileId);
    }

    public async delete(filePath: string): Promise<void> {
        const fileAbsolutePath = path.join(this.options.folder, filePath);
        await fs.promises.unlink(fileAbsolutePath);
    }

    public async deleteIfExists(filePath: string): Promise<void> {
        const fileAbsolutePath = path.join(this.options.folder, filePath);
        const exists = await fileExists(fileAbsolutePath);
        if (exists) {
            await this.delete(filePath);
        }
    }


    /**
     * 
     * explanation: 
     * this method's goal is to create a unique file name
     * the reason this method is async is that we don't want to block the thread from responding to other requests
     * 
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

    protected fileExists(name: string, extension: string): Promise<boolean> {
        const filePath = path.join(this.options.folder, this.fileType, name + "." + extension);
        return fileExists(filePath);
    }

    protected findFirstFileInType(files: FilesType): globalThis.Express.Multer.File {
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

    protected getNameFromPath(path: string): string {
        const [pathWithoutExtension] = path.split(".");
        const name = pathWithoutExtension.split("/")[2];
        return name;
    }
}