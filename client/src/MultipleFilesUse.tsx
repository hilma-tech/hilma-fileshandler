import React, { useState } from 'react';
import MultipleFilesInput from './fileshandler/MultipeFilesInput';
import UploadedFile from './fileshandler/UploadedFile.interface';
import useFiles from './fileshandler/useFiles';

const MultipleFilesUse: React.FC<{}> = props => {
    const filesUploader = useFiles();
    const [images, setImages] = useState<UploadedFile[]>([]);

    const send = async () => {
        const res = await filesUploader.fetch("/multiple", {
            method: "POST",
            body: JSON.stringify(images)
        });
    }

    return (
        <div>
            <button onClick={send}>
                send
            </button>
            <MultipleFilesInput type="image" filesUploader={filesUploader} onChange={setImages} />
            {
                images.map(image => (
                    <div key={image.id}>
                        <img src={image.link} />
                    </div>
                ))
            }
        </div>
    );
}

export default MultipleFilesUse;