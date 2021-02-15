import FilesUploader from "./FilesUploader";
import FileType from "./FileType.type";
import { UploadError } from "./UploadError.interface";

export default interface BaseFileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onError"> {
    onError?: (err: UploadError) => void;
    filesUploader: FilesUploader;
    type: FileType;
    singleUpload?: boolean;
    sizeLimit?: number;
}