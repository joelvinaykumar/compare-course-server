import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { ClassTypes, CourseType, CourseMode } from "../entities/course.enum";

class InstructorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}

class RatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  course_teaching?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  content: number;

  @IsInt()
  @Min(1)
  @Max(5)
  material?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  faculty?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  placement?: number;


  @IsString()
  comment?: string;
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @MaxLength(200)
  description: string;

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

  @IsArray()
  @IsOptional()
  curricuulum?: string[];
}


