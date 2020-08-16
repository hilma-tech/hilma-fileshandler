import { MIME_TYPES } from '../consts'


export abstract class BaseFilesService {
    protected files: any[];

    constructor(private readonly fileType: string) { }

    setClientFiles(files: any[] ): void {

        this.files = files.filter(file => (
            Object.values(MIME_TYPES[this.fileType]).some((mimetype: string | string[]) => {
                if (Array.isArray(mimetype)) {
                    return mimetype.includes(file.mimetype);
                }

                return file.mimetype === mimetype;
            })
        ));
    }
}