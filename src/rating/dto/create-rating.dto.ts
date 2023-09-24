import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  overall?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  content: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  placement?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  faculty?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  doubt_solving?: number;

  @IsString()
  pros: string;

  @IsString()
  cons: string;

  @IsString()
  feedback: string;

  @IsString()
  course?: string;

  @IsBoolean()
  self_declaration: boolean;

  @IsBoolean()
  anonymous?: boolean;
}
