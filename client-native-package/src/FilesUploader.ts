import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { MIME_TYPES, FILES_HANDLER_NAME } from './consts';

class FilesUploader {
    private uploadedFiles: { uri: string, mimeType: string, id: number }[] = [];
    private nextId = 0;

    fetch(input: RequestInfo, init: RequestInit): Promise<Response> {
        const fd = this.createFormData(init.body);
        init.body = fd;
        return fetch(input, init);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        const fd = this.createFormData(data);
        return axios.post(url, fd, config);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        const fd = this.createFormData(data);
        return axios.put(url, fd, config);
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        const fd = this.createFormData(data);
        return axios.patch(url, fd, config);
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        const fd = this.createFormData(config.data);
        config.data = fd;
        return axios.request(config);
    }

    createFormData(data: RequestInit["body"]): FormData {
        const fd = new FormData();
        this.uploadedFiles.forEach(uploadedFile => {
            fd.append(FILES_HANDLER_NAME,
                {
                    uri: uploadedFile.uri,
                    type: uploadedFile.mimeType,
                    name: uploadedFile.id.toString()
                } as any
            );
        });

        fd.append("data", data as string);

        return fd;
    }



    addFile(uri: string): number {
        const id = this.nextId;
        const mimeType = this.findMimeType(uri);

        //TODO: think more about this!!
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