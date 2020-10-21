import { useMemo, useEffect } from 'react';
import FilesUploader from './FilesUploader';

function useFiles(): FilesUploader {
    const filesUploader = useMemo(() => new FilesUploader(), []);


    return filesUploader;
}

export default useFiles;