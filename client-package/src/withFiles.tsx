import React from 'react';

import useFiles from "./useFiles";
import FilesUploader from './FilesUploader';

interface WithFilesProps {
    filesUploader: FilesUploader;
}

const withFiles = <P extends WithFilesProps = WithFilesProps>(Component: React.ComponentType<P>): React.FC<P> => {

    const WithFiles: React.FC<P> = props => {
        const filesUploader = useFiles();
        return <Component {...props} filesUploader={filesUploader} />;
    };

    WithFiles.displayName = `withFiles(${Component.displayName || Component.name || "Component"})`;

    return WithFiles;
};

export default withFiles;
