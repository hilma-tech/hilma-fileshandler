import React, { FC, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ACCEPTS, TYPES, MIME_TYPES } from './consts';
import FilesUploader from './FilesUploader';
import UploadedFile from './UploadedFile.interface';
import FileType from './FileType.type';
import { UploadError } from './UploadError.interface';

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onError"> {
    onChange?: (value: UploadedFile) => void;
    onError?: (err: UploadError) => void;
    filesUploader: FilesUploader;
    type: FileType;
    singleUpload?: boolean;
}

const FileInput: FC<FileInputProps> = props => {
    const { onChange, filesUploader, type, singleUpload = true, onError, ...otherProps } = props;

    const lastUploadedFile = useRef<UploadedFile | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = (e.target.files as FileList)[0];

        if (!file) {
            return;
        }

        if (!MIME_TYPES[type].includes(file.type)) {
            if (onError) {
                onError({
                    mimeType: file.type
                });
            }

            return;
        }

        const uploadRes = filesUploader.upload(file);

        if (onChange) {
            onChange(uploadRes);
        }

        if (!singleUpload) {
            return;
        }

        if (lastUploadedFile.current) {
            filesUploader.delete(lastUploadedFile.current.id, lastUploadedFile.current.link);
        }

        lastUploadedFile.current = uploadRes;
    }

    const accept = useMemo(() => ACCEPTS[type] ? "." + ACCEPTS[type].join(", .") : "", [type]);

    return (
        <input type="file" onChange={handleChange} accept={accept} {...otherProps} />
    );
}

FileInput.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    filesUploader: PropTypes.instanceOf(FilesUploader).isRequired,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    singleUpload: PropTypes.bool,
};

export default FileInput;