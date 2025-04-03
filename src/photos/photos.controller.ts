import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() dto: CreatePhotoDto) {
    return this.photosService.create(dto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.photosService.findByUser(userId);
  }

  @Put(':id/main')
    async setMainPhoto(@Param('id') photoId: string) {
    return this.photosService.setMainPhoto(photoId);
  }

}
