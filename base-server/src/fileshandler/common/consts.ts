export const FILE_TYPES = {
    IMAGE: "image",
    AUDIO: "audio",
    FILE: "file",
    VIDEO: "video"
};

export const MIME_TYPES: {
    [fileType: string]: {
        [extension: string]: string | string[]
    }
} = {
    image: {
        jpg: "image/jpeg",
        png: "image/png",
        jpeg: "image/jpeg",
        // gif: "image/gif",
        // svg: "image/svg+xml",
    },
    audio: {
        mp3: [
            "audio/mp3",
            "application/octet-stream"
        ],
        m4a: "audio/x-m4a",
        wav: [
            "audio/wav",
            "audio/x-wav"
        ],
        mpeg: "audio/mpeg",
        webm: "audio/webm",
        aac: "audio/aac"
    },
    file: {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    video: {
        webm: "video/webm",
        mp4: "video/mp4",
        ogg: "video/ogg",
        avi: "video/avi",
        mov: "video/quicktime",
    }
}

export const FILESHANDLER_OPTIONS_SIGN = "filesHandlerOptionsSign";

export const SPECIAL_ROLES = {
    EVERYONE: "$everyone",
    AUTHENTICATED: "$authenticated",
    UNAUTHENTICATED: "$unauthenticated"
};

export const PERMISSIONS_FILTER = "permissionsFilter";

export const FILE_MAX_SIZES = {
    image: 5000,
    audio: 50000,
    file: 500,
    video: 50000
}

