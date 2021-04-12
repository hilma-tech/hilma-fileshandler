import * as fs from 'fs';

/*
 * the reason we use fs.access instead of fs.exists is that fs.exists is depreacated.
 * In NodeJS's documentation it is recommended to use fs.access, so in order to check if a file exists, 
 * we check if an error was thrown from fs.access
*/

export async function fileExists(absolutePath: string): Promise<boolean> {
    try {
        await fs.promises.access(absolutePath);
        return true;
    } catch (err) {
        return false;
    }
}