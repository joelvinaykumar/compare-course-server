import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InstituteMode, InstituteType } from '../entities/institute.enum';

export class FilterInstituteDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(InstituteType)
  @IsOptional()
  type?: string;

  @IsEnum(InstituteMode)
  @IsOptional()
  mode?: string;
}

export class FilterInstituteLiteDto {
  @IsString()
  @IsOptional()
  name?: string;
}
