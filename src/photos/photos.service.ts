import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepo: Repository<Photo>,
    
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    
    private readonly usersService: UsersService, // ← ¡IMPORTANTE!
  ) {}

  async create(dto: CreatePhotoDto): Promise<Photo> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // ⚠️ Si esta nueva foto será principal, desactivar las otras
    if (dto.is_main) {
        await this.photoRepo.update(
        { user: { id: dto.userId }, is_main: true },
        { is_main: false }
        );
    }

    const photo = this.photoRepo.create({
        id: uuidv4(),
        url: dto.url,
        is_main: dto.is_main || false,
        user,
      });

    return this.photoRepo.save(photo);
  }

  async findByUser(userId: string): Promise<Photo[]> {
    return this.photoRepo.find({
      where: { user: { id: userId } },
      order: { uploaded_at: 'DESC' },
    });
  }

  async setMainPhoto(photoId: string): Promise<UserProfileDto> {
    const photo = await this.photoRepo.findOne({
      where: { id: photoId },
      relations: ['user'],
    });
  
    if (!photo) {
      throw new NotFoundException('Foto no encontrada');
    }
  
    const userId = photo.user.id;
  
    // 1. Desactivar otras fotos principales
    await this.photoRepo.update(
      { user: { id: userId }, is_main: true },
      { is_main: false }
    );
  
    // 2. Activar esta como principal
    photo.is_main = true;
    await this.photoRepo.save(photo);
  
    return this.usersService.getProfile(userId);
  }
  
}
