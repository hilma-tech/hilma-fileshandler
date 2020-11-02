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

export const FILES_HANDLER_NAME = "FilesHandler";