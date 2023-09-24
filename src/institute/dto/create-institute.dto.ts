import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { InstituteMode, InstituteType } from '../entities/institute.enum';

class FacultyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}

export class CreateInstituteDto {
  @IsString()
  adminName: string;

  @IsString()
  adminEmail: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsEnum(InstituteType)
  type: string;

  @IsEnum(InstituteMode, { each: true })
  mode: string[];

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  about?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacultyDto)
  @IsOptional()
  faculty?: FacultyDto[];

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
