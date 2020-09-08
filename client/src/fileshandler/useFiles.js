import { useMemo, useEffect } from 'react';
import FilesUploader from './FilesUploader';

function useFiles() {
    const filesUploader = useMemo(() => new FilesUploader(), []);

    useEffect(() => () => {
        filesUploader.deleteAll();
    }, []);

    return filesUploader;
}

export default useFiles;