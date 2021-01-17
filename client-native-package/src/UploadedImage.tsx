import React from 'react';
import { Image, ImageProps } from 'react-native';

import getFullPath from './getFullPath';
import useAuthHeaders from './useAuthHeaders';

const UploadedImage: React.FC<ImageProps> = props => {

    const { source: originalSource, ...otherProps } = props;

    if (typeof originalSource === "number") {
        console.error("Fileshandler: you are not suppose to use UploadedImage Component with local images")
        return null;
    }


    let source = { ...originalSource };

    const headers = useAuthHeaders();

    if (Array.isArray(source)) {
        source = source.map(sourceItem => {
            if (!sourceItem.uri) {
                return sourceItem;
            }

            const { uri: originalUri, headers: originalHeaders, ...otherSourceItems } = sourceItem;

            const uri = getFullPath(originalUri);
            const itemHeaders = originalHeaders ? { ...originalHeaders, ...headers } : headers;

            return {
                uri,
                headers: itemHeaders,
                ...otherSourceItems
            }
        });
    } else if (source.uri) {
        source.uri = getFullPath(source.uri);
        source.headers = source.headers ? { ...source.headers, ...headers } : headers;
    }

    return (
        <Image
            source={source}
            {...otherProps}
        />
    );
}


export default UploadedImage;