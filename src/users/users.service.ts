import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; 
import { CreateUserDto } from './dto/create-user.dto';
import { differenceInYears } from 'date-fns';
import { UserProfileDto } from './dto/user-profile.dto';
import { Photo } from '../photos/photo.entity';




@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      id: uuidv4(),
      ...createUserDto,
    });
    return this.userRepository.save(newUser);
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['photos'],
    });
  
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    const mainPhoto = user['photos']?.find((p: Photo) => p.is_main);
  
    const age = differenceInYears(new Date(), new Date(user.birth_date));
  
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      bio: user.bio,
      age,
      photo_url: mainPhoto?.url || null,
      location: {
        lat: user.location_lat,
        lon: user.location_lon,
      },
    };
  }

  async getPhotosByUser(userId: string): Promise<Photo[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['photos'],
    });
  
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    return user.photos;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
