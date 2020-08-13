import { Module, DynamicModule } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Module({})
export class FileshandlerModule {
    static register(options: { storageName: string }): DynamicModule {

        const folderPath = `/fileshandler/${options.storageName}`;
        const exists = fs.existsSync(folderPath);

        if (!exists) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        return {
            module: FileshandlerModule,
            providers: [
                {
                    provide: "CONFIG_OPTIONS",
                    useValue: options
                }
            ]
        }
    }
}
