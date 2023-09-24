import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';
import { ClassTypes, CourseMode, CourseType } from '../entities/course.enum';

export class FilterCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsArray({ each: true })
  @IsOptional()
  institutes?: string[];

  @IsEnum(ClassTypes)
  @IsOptional()
  classType?: string;

  @IsEnum(CourseType)
  @IsOptional()
  type?: string;

  @IsEnum(CourseMode)
  @IsOptional()
  mode?: string;
}

export class FilterCourseLiteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;
}
