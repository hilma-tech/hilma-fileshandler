import React, { useState } from 'react';
import useFiles from './fileshandler/useFiles';
import FileInput from './fileshandler/FileInput';
import { UploadError } from './fileshandler/UploadError.interface';

const AxiosUse: React.FC = () => {
    const filesUploader = useFiles();

    const [imageObj, setImageObj] = useState<{ link: string, id: number } | null>(null);
    const [uploadedImage, setUploadedImage] = useState("");

    const send = async () => {
        const res = await filesUploader.post("/hello", JSON.stringify({
            imageId: imageObj ? imageObj.id : 0
        }))

        setUploadedImage(res.data.image);
        alert("done");
    }


    const handleImageChange = (value: { link: string, id: number }): void => {
        setImageObj(value);
    };

    const handleError = (error: UploadError) => {
        console.log(error)
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


            axios
            <FileInput style={{}} type="image" filesUploader={filesUploader} onChange={handleImageChange} onError={handleError} />
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

export default AxiosUse;