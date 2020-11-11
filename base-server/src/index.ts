//common
export * from './fileshandler/common/decorators/filesHandler.decorator';
export * from './fileshandler/common/interfaces/fIlesHandlerOptions.interface';
export * from './fileshandler/common/types/permissionsFilter.type';

//fileshandler module
export * from './fileshandler/file/fileshandler.module';

//services
export * from './fileshandler/file/services/upload/image.service';
export * from './fileshandler/file/services/upload/audio.service';
export * from './fileshandler/file/services/upload/file.service';
export * from './fileshandler/file/services/upload/video.service';

//exports from other modules - only for convinient
export { UploadedFiles } from '@nestjs/common';
export * from './fileshandler/common/types/files.type';
