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

  @IsOptional()
  @IsEnum(ClassTypes, { each: true })
  classType?: ClassTypes[];

  @IsOptional()
  @IsEnum(CourseType, { each: true })
  type?: CourseType[];

  @IsOptional()
  @IsEnum(CourseMode, { each: true })
  mode?: CourseMode[];

  @IsOptional()
  @IsString()
  rating?: string;
}

export class FilterCourseLiteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;
}
