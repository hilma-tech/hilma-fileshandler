class FilesUploader {
    uploadedFiles = [];
    nextId = 0;

    fetch(url, payload) {
        const fd = new FormData();

        this.uploadedFiles.forEach(uploadedFile => {
            fd.append("FilesHandler", uploadedFile.file, uploadedFile.id);
        });

        const data = payload.body;
        fd.append("data", data);

        payload.body = fd;

        return fetch(url, payload);
    }

    delete(id, link) {
        URL.revokeObjectURL(link);

        this.uploadedFiles = this.uploadedFiles.filter(uploadedFile => uploadedFile.id !== id);
    }

    deleteAll() {
        this.uploadedFiles.forEach(uploadedFile => {
            URL.revokeObjectURL(uploadedFile.link);
        });
    }

    upload(file) {
        const id = this.nextId;
        const link = URL.createObjectURL(file);

        this.uploadedFiles.push({
            id,
            file,
            link
        });

        this.nextId++;

        return {
            id: id,
            link
        };
    }
}

export default FilesUploader;