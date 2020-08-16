import { Module, DynamicModule } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { FilesHandlerOptions } from './interfaces/fIlesHandlerOptions.interface';
import { FILE_TYPES } from './consts';

@Module({})
export class FilesHandlerModule {
    static register(options: FilesHandlerOptions): DynamicModule {

        FilesHandlerModule.createFolders(options);

        return {
            module: FilesHandlerModule,
            providers: [
                {
                    provide: "CONFIG_OPTIONS",
                    useValue: options
                }
            ]
        }
    }

    static createFolders(options: FilesHandlerOptions): void {
        FILE_TYPES.forEach(fileType => {
            const folderPath = path.resolve(options.folder, fileType);
            fs.mkdirSync(folderPath, {recursive: true});
        });
    }
}
