export interface UploadError {
    type: "wrong-type" | "file-size";
    mimeType?: string;
    size?: number;
}