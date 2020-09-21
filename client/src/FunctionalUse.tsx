import React, { useState } from 'react';
import useFiles from './fileshandler/useFiles';
import FileInput from './fileshandler/FileInput';

const FunctionalUse: React.FC = () => {
    const filesUploader = useFiles();

    const [imageObj, setImageObj] = useState<{ link: string, id: number } | null>(null);
    const [uploadedImage, setUploadedImage] = useState("");

    const send = async () => {
        const res = await filesUploader.fetch("/hello", {
            method: "POST",
            body: JSON.stringify({
                imageId: imageObj ? imageObj.id : 0
            })
        });

        const data = await res.json();

        setUploadedImage(data.image);
        alert("done");
    }


    const handleImageChange = (e: { target: { value: { link: string, id: number } } }): void => {
        setImageObj(e.target.value);
    };



    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


            function
            <FileInput style={{}} type="image" filesUploader={filesUploader} onChange={handleImageChange} />
            {
                imageObj &&
                <img src={imageObj.link} />
            }


            {
                uploadedImage &&
                <img src={uploadedImage} />
            }


            <button onClick={send}>send</button>


        </div>
    );
}

export default FunctionalUse;