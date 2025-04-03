import {
    Controller,
    Post,
    Body,
    NotFoundException,
    UnauthorizedException,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  import { User } from '../users/user.entity';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('login')
    @HttpCode(HttpStatus.OK) // Esto asegura que se devuelva un 200 OK en lugar de 201
    async login(@Body() body: { email: string; password: string }): Promise<{ user: User }> {
      const { email, password } = body;
  
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new NotFoundException('Usuario no encontrado');
  
      if (user.password_hash !== password) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }
  
      return { user };
    }
  }
  