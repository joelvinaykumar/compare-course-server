import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassTypes, CourseType, CourseMode } from '../entities/course.enum';

class InstructorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  @IsOptional()
  average_rating?: number;

  @IsEnum(ClassTypes)
  @IsOptional()
  class_type?: ClassTypes;

  @IsEnum(CourseType)
  @IsOptional()
  type?: CourseType;

  @IsEnum(CourseMode)
  @IsOptional()
  mode?: CourseMode;

  @IsArray()
  @Type(() => InstructorDto)
  @IsOptional()
  instructor?: InstructorDto[];

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsArray()
  @IsOptional()
  curricuulum?: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  no_of_hours?: number;

  @IsBoolean()
  @IsOptional()
  provides_support?: boolean;

  @IsBoolean()
  @IsOptional()
  provides_certificate?: boolean;
}
