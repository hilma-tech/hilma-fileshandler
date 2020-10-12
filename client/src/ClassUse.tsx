import React from 'react';
import withFiles from './fileshandler/withFiles';
import FilesUploader from './fileshandler/FilesUploader';
import FilesInput from './fileshandler/FileInput';

export interface ClassUseProps {
    filesUploader: FilesUploader;
}

export interface ClassUseState {
    image: {
        link: string;
        id: number;
    } | null;
    uploadedImage: string;
}

class ClassUse extends React.Component<ClassUseProps, ClassUseState> {
    constructor(props: ClassUseProps) {
        super(props);

        this.handleSend = this.handleSend.bind(this);
    }
    state: ClassUseState = {
        image: null,
        uploadedImage: ""
    };

    async handleSend() {
        const res = await this.props.filesUploader.fetch("/hello", {
            method: "POST",
            body: JSON.stringify({
                imageId: this.state.image
            })
        });

        const data = await res.json();
        console.log(data)
        this.setState({ uploadedImage: data.image });
    }


    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                class
                <FilesInput filesUploader={this.props.filesUploader} type="image" onChange={(value: { link: string; id: number }) => this.setState({ image: value })} />
                <button onClick={this.handleSend}>send</button>
                {
                    this.state.image
                    &&
                    <img src={this.state.image.link} />
                }
                {
                    this.state.uploadedImage
                    &&
                    <img src={this.state.uploadedImage} />
                }
            </div>
        );
    }
}

export default withFiles(ClassUse);