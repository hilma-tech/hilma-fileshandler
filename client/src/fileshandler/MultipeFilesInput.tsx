import React, { FC, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ACCEPTS, FILE_MAX_SIZES, MIME_TYPES, TYPES } from './consts';
import FilesUploader from './FilesUploader';
import UploadedFile from './UploadedFile.interface';
import BaseFileInputProps from './BaseFileInputProps';
import useAccept from './useAccept';

interface FileInputProps extends BaseFileInputProps {
    onChange?: (value: UploadedFile[]) => void;
}

const MultipleFilesInput: FC<FileInputProps> = props => {
    const { onChange, filesUploader, type, singleUpload = true, onError, sizeLimit, preventDoubleSelection, ...otherProps } = props;

    const lastUploadedFiles = useRef<UploadedFile[] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files as FileList;

        if (!files) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            if (!MIME_TYPES[type].includes(files[i].type)) {
                if (onError) {
                    onError({
                        type: "wrong-type",
                        mimeType: files[i].type
                    });
                }
                return;
            }
        }

        const maxSize = sizeLimit || FILE_MAX_SIZES[type];

        for (let i = 0; i < files.length; i++) {
            if (files[i].size / 1000 > maxSize) {
                if (onError) {
                    onError({
                        type: "file-size",
                        size: files[i].size
                    });
                }
                return;
            }
        }


        const uploadsRes: UploadedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            uploadsRes.push(filesUploader.upload(files[i]));
        }

        if (onChange) {
            onChange(uploadsRes);
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

    // delete the current value, if the user selects the same file twice it will still call "onChange"
    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!preventDoubleSelection) {
            e.currentTarget.value = "";
        }
    }

    const accept = useAccept(type);

    return (
        <input type="file" onChange={handleChange} onClick={handleClick} accept={accept} {...otherProps} multiple />
    );
}

MultipleFilesInput.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    filesUploader: PropTypes.instanceOf(FilesUploader).isRequired,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    singleUpload: PropTypes.bool,
    sizeLimit: PropTypes.number
};

export default MultipleFilesInput;