import FileType from "./FileType.type";

export const TYPES: FileType[] = ["image", "audio", "video", "file"];

export const ACCEPTS: { [key in FileType]: string[] } = {
    file: [
        "pdf",
        "doc",
        "docx"
    ],
    image: [
        "jpg",
        "png",
        "jpeg",
        // "gif",
        // "svg"
    ],
    audio: [
        "mp3",
        "m4a",
        "wav",
        "mpeg",
        "webm",
        "aac"
    ],
    video: [
        "mp4",
        "ogg",
        "avi",
        "webm",
        "mov"
    ]
}

export const MIME_TYPES: {
    [key in FileType]: string[]
} = {
    image: [
        "image/jpeg",
        "image/png",
        "image/jpeg"
    ],
    audio: [
        "audio/mp3",
        "application/octet-stream",
        "audio/x-m4a",
        "audio/wav",
        "audio/x-wav",
        "audio/mpeg",
        "audio/webm",
        "audio/aac"
    ],
    file: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    video: [
        "video/webm",
        "video/mp4",
        "video/ogg",
        "video/avi",
        "video/quicktime",
    ]
}

export const FILES_HANDLER_NAME = "FilesHandler";