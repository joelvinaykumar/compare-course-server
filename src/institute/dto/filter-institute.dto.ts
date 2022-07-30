import { IsOptional, IsString } from "class-validator";

export class FilterInstituteDto {
  @IsString()
  @IsOptional()
  name?: string;
}