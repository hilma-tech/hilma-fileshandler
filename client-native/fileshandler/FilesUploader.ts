import { MIME_TYPES } from './consts';

class FilesUploader {
    private uploadedFiles: { uri: string, mimeType: string, id: number }[] = [];
    private nextId = 0;

    fetch(input: RequestInfo, init: RequestInit): Promise<Response> {
        const fd = new FormData();

        this.uploadedFiles.forEach(uploadedFile => {
            fd.append("FilesHandler", {
                uri: uploadedFile.uri,
                type: uploadedFile.mimeType,
                name: uploadedFile.id.toString()
            } as any);
        });

        const data = init.body;
        fd.append("data", data as string);

        init.body = fd;

        return fetch(input, init);
    }

    addFile(uri: string): number {
        const id = this.nextId;
        const mimeType = this.findMimeType(uri);

        //think more about this!!
        if (!mimeType) {
            throw new Error("unsupported file type");
        }

        this.uploadedFiles.push({
            id,
            mimeType,
            uri
        });

        this.nextId += 1;

        return id;
    }

    delete(id: number): void {
        this.uploadedFiles = this.uploadedFiles.filter(uploadedFile => uploadedFile.id !== id);
    }

    deleteAll(): void {
        this.uploadedFiles = [];
    }

    private findMimeType(uri: string): string {
        const uriParts = uri.split(".");
        const extension = uriParts[uriParts.length - 1];
        for (const fileType in MIME_TYPES) {
            if (MIME_TYPES[fileType][extension]) {
                return MIME_TYPES[fileType][extension];
            }
        }

        return "";
    }
}

export default FilesUploader;