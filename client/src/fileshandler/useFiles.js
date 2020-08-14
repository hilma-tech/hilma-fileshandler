import { useMemo, useEffect } from 'react';
import FilesUploader from './FilesUploader';

function useFiles() {
    const filesUplader = useMemo(() => new FilesUploader, []);

    useEffect(() => {
        return filesUplader.deleteAll();
    }, []);

    return filesUplader;
}

export default useFiles;