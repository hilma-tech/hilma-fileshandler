import { MIME_TYPES } from "../consts";

export function findType(mimetype: string): string | null {

    for (const fileType in MIME_TYPES) {
        for (const mime of Object.values(MIME_TYPES[fileType])) {
            if (Array.isArray(mime) && mime.includes(mimetype) || mime === mimetype) {
                return fileType;
            }
        }
    }

    return null;
}