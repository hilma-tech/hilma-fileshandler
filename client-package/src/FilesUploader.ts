import UploadedFile from "./UploadedFile.interface";

class FilesUploader {
    private uploadedFiles: { file: File, id: number, link: string }[] = [];
    private nextId = 0;

    fetch(input: RequestInfo, init: RequestInit): Promise<Response> {
        const fd = new FormData();

        this.uploadedFiles.forEach(uploadedFile => {
            fd.append("FilesHandler", uploadedFile.file, uploadedFile.id.toString());
        });

        const data = init.body;
        fd.append("data", data as string);

        init.body = fd;

        return fetch(input, init);
    }

    delete(id: number, link: string): void {
        URL.revokeObjectURL(link);

        this.uploadedFiles = this.uploadedFiles.filter(uploadedFile => uploadedFile.id !== id);
    }

    deleteAll(): void {
        this.uploadedFiles.forEach(uploadedFile => {
            URL.revokeObjectURL(uploadedFile.link);
        });
    }

    upload(file: File): UploadedFile {
        const id = this.nextId;
        const link = URL.createObjectURL(file);

        this.uploadedFiles.push({
            id,
            file,
            link
        });

        this.nextId++;

        return {
            id: id,
            link
        };
    }
}

export default FilesUploader;