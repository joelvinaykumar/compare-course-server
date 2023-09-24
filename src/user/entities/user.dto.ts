import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserDtoRole } from './user.enum';

export class CreateUsereDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsEnum(UserDtoRole)
  role: string;

  @IsString()
  @IsOptional()
  organization?: string;

  @IsString()
  password: string;
}

export class UpdateCourseDto extends PartialType(CreateUsereDto) {}
