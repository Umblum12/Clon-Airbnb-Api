import { Controller, FileTypeValidator, Get, Post, Delete, Param, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cloudinaryService : CloudinaryService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 

    @Delete('delete/:public_id')
    deleteImage(@Param('public_id') public_id: string): Promise<any> {
      return this.cloudinaryService.deleteFile(public_id);
    }

}
