import React, { FC, useRef } from 'react';
import PropTypes from 'prop-types';
import { TYPES, MIME_TYPES, FILE_MAX_SIZES } from './consts';
import FilesUploader from './FilesUploader';
import UploadedFile from './UploadedFile.interface';
import BaseFileInputProps from './BaseFileInputProps';
import useAccept from './useAccept';

interface FileInputProps extends BaseFileInputProps {
    onChange?: (value: UploadedFile) => void;
}

const FileInput: FC<FileInputProps> = props => {
    const { onChange, filesUploader, type, singleUpload = true, onError, sizeLimit, preventDoubleSelection, ...otherProps } = props;

    const lastUploadedFile = useRef<UploadedFile | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = (e.target.files as FileList)[0];

        if (!file) {
            return;
        }

        if (!MIME_TYPES[type].includes(file.type)) {
            if (onError) {
                onError({
                    type: "wrong-type",
                    mimeType: file.type
                });
            }
            return;
        }

        const maxSize = sizeLimit || FILE_MAX_SIZES[type];

        if (file.size / 1000 > maxSize) {
            if (onError) {
                onError({
                    type: "file-size",
                    size: file.size
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

    // delete the current value, if the user selects the same file twice it will still call "onChange"
    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!preventDoubleSelection) {
            e.currentTarget.value = "";
        }
    }

    const accept = useAccept(type);

    return (
        <input type="file" onChange={handleChange} accept={accept} onClick={handleClick} {...otherProps} />
    );
}

FileInput.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    filesUploader: PropTypes.instanceOf(FilesUploader).isRequired,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    singleUpload: PropTypes.bool,
    sizeLimit: PropTypes.number
};

export default FileInput;