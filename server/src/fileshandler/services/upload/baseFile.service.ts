import * as fs from 'fs';
import * as path from 'path';

import { MIME_TYPES } from '../../consts'
import { FilesHandlerOptions } from '../../interfaces/fIlesHandlerOptions.interface';
import * as randomstring from 'randomstring';

export abstract class BaseFilesService {
    protected files: { extension: string, file: any }[];

    constructor(
        protected readonly options: FilesHandlerOptions,
        private readonly fileType: string
    ) { }

    public setClientFiles(files: any[]): void {
        this.files = [];
        files.forEach(file => {
            for (let ext in MIME_TYPES[this.fileType]) {
                if (MIME_TYPES[this.fileType][ext] === file.mimetype || Array.isArray(MIME_TYPES[this.fileType][ext]) && MIME_TYPES[this.fileType][ext].includes(file.mimetype)) {
                    this.files.push({
                        extension: ext,
                        file
                    });
                }
            }
        });
    }

    protected async saveFile(buffer: Buffer, fileName: string, fileExtension: string): Promise<void> {
        const fileAbsolutePath = path.resolve(this.options.folder, this.fileType, fileName + "." + fileExtension);
        await fs.promises.writeFile(fileAbsolutePath, buffer);
    }

    public async save(clientFileId: number): Promise<string> {
        const fileAndExt = this.files.find(fileAndExt => fileAndExt.file.originalname === clientFileId.toString());

        if (!fileAndExt) {
            throw new Error(`FilesHandler: cannot save file ${clientFileId}, file doesn't exist`);
        }

        const fileName = await this.createUniqueFileName(fileAndExt.extension);

        await this.saveFile(fileAndExt.file.buffer, fileName, fileAndExt.extension);

        const filePath = `/${this.fileType}/${fileName}.${fileAndExt.extension}`;
        return filePath;
    }

    // public async update(filePath: string, clientFileId: number): Promise<string> {
    //     const fileAndExt = this.files.find(fileAndExt => fileAndExt.file.originalname === clientFileId.toString());

    //     if (!fileAndExt) {
    //         throw new Error(`FilesHandler: cannot update file ${filePath} to the file from the client with an id of ${clientFileId}`)
    //     }

    //     const fileName = this.getFileName(filePath);
    //     await this.saveFile(fileAndExt.file.buffer, fileName, fileAndExt.extension);

    //     const newFilePath = `/${this.fileType}/${fileName}.${fileAndExt.extension}`;
    //     return newFilePath;
    // }

    private getFileName(url: string): string {
        const [_, fileType, fileNameWithExtension] = url.split("/");
        const fileName = fileNameWithExtension.split(".")[0];
        return fileName;
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
        const filePath = path.resolve(this.options.folder, this.fileType, name + "." + extension);
        try {
            await fs.promises.access(filePath);
            return true;
        } catch (err) {
            return false;
        }
    }
}