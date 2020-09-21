import React, { FC, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ACCEPTS, TYPES } from './consts';
import FilesUploader from './FilesUploader';
import UploadedFile from './UploadedFile.interface';
import FileType from './FileType.type';

interface FileInputProps {
    onChange?: (e: { target: { value: UploadedFile[] } }) => void;
    filesUploader: FilesUploader;
    type: FileType;
    singleUpload?: boolean;
}

const MultipleFilesInput: FC<FileInputProps> = props => {
    const { onChange, filesUploader, type, singleUpload = true, ...otherProps } = props;

    const lastUploadedFiles = useRef<UploadedFile[] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;

        if (!files) {
            return;
        }

        const uploadsRes: UploadedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            uploadsRes.push(filesUploader.upload(files[i]));
        }

        if (onChange) {
            onChange({
                target: {
                    value: uploadsRes
                }
            });
        }

        if (!singleUpload) {
            return;
        }

        if (lastUploadedFiles.current) {
            lastUploadedFiles.current.forEach(uploadedFile => {
                filesUploader.delete(uploadedFile.id, uploadedFile.link);
            });
        }

        lastUploadedFiles.current = uploadsRes;
    }

    const accept = useMemo(() => ACCEPTS[type] ? "." + ACCEPTS[type].join(", .") : "", [type]);

    return (
        <input type="file" onChange={handleChange} accept={accept} {...otherProps} multiple />
    );
}

MultipleFilesInput.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    filesUploader: PropTypes.instanceOf(FilesUploader).isRequired,
    onChange: PropTypes.func,
    singleUpload: PropTypes.bool
};

export default MultipleFilesInput;