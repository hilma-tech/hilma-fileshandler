import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import UploadedFile from "./UploadedFile.interface";
import { FILES_HANDLER_NAME } from './consts';

class FilesUploader {
    private uploadedFiles: { file: File, id: number, link: string }[] = [];
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
            fd.append(FILES_HANDLER_NAME, uploadedFile.file, uploadedFile.id.toString());
        });

        fd.append("data", data as string);

        return fd;
    }

    delete(id: number, link: string): void {
        URL.revokeObjectURL(link);

        this.uploadedFiles = this.uploadedFiles.filter(uploadedFile => uploadedFile.id !== id);
    }

    deleteAll(): void {
        this.uploadedFiles.forEach(uploadedFile => {
            URL.revokeObjectURL(uploadedFile.link);
        });

        this.uploadedFiles = [];
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