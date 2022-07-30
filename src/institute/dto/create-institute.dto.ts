import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

class FacultyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}

export class CreateInstituteDto {
  @IsString()
  name: string;

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

