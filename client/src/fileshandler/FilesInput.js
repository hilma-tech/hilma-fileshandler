import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ACCEPTS, TYPES } from './consts';
import FilesUploader from './FilesUploader';


function FileInput(props) {
    const { onChange, filesUploader, type, singleUpload = true, ...otherProps } = props;

    const lastUploadedFile = useRef(null);

    const handleChange = e => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const uploadRes = filesUploader.upload(file);

        onChange({
            target: {
                value: uploadRes
            }
        });

        if (!singleUpload) {
            return;
        }

        if (lastUploadedFile.current) {
            filesUploader.delete(lastUploadedFile.current.id, lastUploadedFile.current.link);
        }

        lastUploadedFile.current = uploadRes;
    }

    const accept = useMemo(() => "." + ACCEPTS[type].join(", ."), [type]);

    return (
        <input type="file" onChange={handleChange} accept={accept} {...otherProps} />
    );
}

FileInput.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    filesUploader: PropTypes.instanceOf(FilesUploader).isRequired,
    onChange: PropTypes.func.isRequired,
    singleUpload: PropTypes.bool
};

export default FileInput;