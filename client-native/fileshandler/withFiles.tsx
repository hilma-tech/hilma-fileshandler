import React from 'react';

import useFiles from './useFiles';
import FilesUploader from './FilesUploader';

export interface WithFilesProps {
    filesUploader: FilesUploader;
}

const withFiles = <P extends WithFilesProps = WithFilesProps>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, 'filesUploader'>> => {

    const WithFiles: React.FC<Omit<P, 'filesUploader'>> = props => {
        const filesUploader = useFiles();
        return <Component {...props as P} filesUploader={filesUploader} />
    };

    WithFiles.displayName = `withFiles(${Component.displayName || Component.name || "Component"})`;

    return WithFiles;
}

export default withFiles;