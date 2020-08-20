import { useMemo, useEffect, useState } from 'react';
import FilesUploader from './FilesUploader';

function useFiles() {
    const [filesUplader, setFilesUploader] = useState(null);

    useEffect(() => {
        setFilesUploader(new FilesUploader());
        
        return () => {
            filesUplader.deleteAll();
        };
    }, []);

    return filesUplader;
}

export default useFiles;