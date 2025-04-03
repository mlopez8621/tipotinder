import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  is_main?: boolean;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
