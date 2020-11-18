//common
export * from './fileshandler/common/decorators/filesHandler.decorator';
export * from './fileshandler/common/interfaces/filesHandlerOptions.interface';
export * from './fileshandler/common/consts';

//fileshandler module
export * from './fileshandler/file/fileshandler.module';

//services
export * from './fileshandler/file/services/upload/baseFile.service';
export * from './fileshandler/file/services/upload/image.service';
export * from './fileshandler/file/services/upload/audio.service';
export * from './fileshandler/file/services/upload/file.service';
export * from './fileshandler/file/services/upload/video.service';

//exports from other modules - only for convinient
export { UploadedFiles } from '@nestjs/common';
export * from './fileshandler/common/types/files.type';

//global permissions
export * from './fileshandler/common/types/requestUser.type';
export * from './fileshandler/common/interfaces/permissionsFilter.interface';
