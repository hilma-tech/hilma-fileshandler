import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    View,
    Image,

} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

import useFiles from './fileshandler/useFiles';



function ImageUploader() {
    const [image, setImage] = useState("");
    const [id, setId] = useState(-1);
    const filesUploader = useFiles();

    const pick = async () => {

        const d: any = await DocumentPicker.getDocumentAsync({
            type: "image/*"
        });

        setImage(d.uri);

        const id = filesUploader.addFile(d.uri);
        setId(id);
    };

    const send = async () => {
        try {

            // const data = await filesUploader.fetch("http://10.11.54.217:8080/multiple", {
            //     method: "POST",
            //     body: JSON.stringify({ imageId: id })
            // });
            // const res2 = await data.json();
            // console.log(res2)

            // const res = await filesUploader.post("http://10.11.54.217:8080/multiple", JSON.stringify({ imageId: id }))
            // console.log(res.data)

            const res = await filesUploader.request({
                url: "http://10.11.54.217:8080/multiple",
                method: "POST",
                data: JSON.stringify({ imageId: id })
            });
            console.log(res.data)
        } catch (err) {
            console.log("error")
            console.log(err)
        }
    };

    return (
        <View>
            <Button title="upload" onPress={pick} />
            {
                image !== "" &&
                <Image
                    source={{
                        uri: image
                    }}
                    style={{
                        width: 100,
                        height: 100
                    }}
                />
            }
            <Button title="send" onPress={send} />

        </View>
    );
}

const styles = StyleSheet.create({

});


export default ImageUploader;