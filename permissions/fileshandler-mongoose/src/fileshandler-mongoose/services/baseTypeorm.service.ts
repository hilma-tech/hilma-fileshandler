// import { BaseFilesService, FilesType } from '@hilma/fileshandler-server';
// import { FilePermissionService } from '../filePermission/filePermission.service';


// export abstract class BaseTypeormService {
//     constructor(
//         protected readonly uploadService: BaseFilesService,
//         protected readonly filePermissionService: FilePermissionService
//     ) { }

//     public async saveWithUserPermission(files: FilesType, clientFileId: number, userId: string): Promise<string> {
//         const path = await this.uploadService.save(files, clientFileId);
//         await this.filePermissionService.saveUserPermission(path, userId);
//         return path;
//     }

//     public async saveWithRolePermission(files: FilesType, clientFileId: number, roleName: string): Promise<string> {
//         const path = await this.uploadService.save(files, clientFileId);
//         await this.filePermissionService.saveRolePermission(path, roleName);
//         return path;
//     }


//     public async saveSingleFileWithUserPermission(files: FilesType, userId: string): Promise<string> {
//         const path = await this.uploadService.saveSingleFile(files);
//         await this.filePermissionService.saveUserPermission(path, userId);
//         return path;
//     }

//     public async saveSingleFileWithRolePermission(files: FilesType, roleName: string): Promise<string> {
//         const path = await this.uploadService.saveSingleFile(files);
//         await this.filePermissionService.saveRolePermission(path, roleName);
//         return path;
//     }



//     public async deleteWithPermissions(filePath: string): Promise<void> {
//         await this.uploadService.delete(filePath);
//         await this.filePermissionService.delete(filePath);
//     }
// }