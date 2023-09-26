import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RatingType } from '../entities/rating.enum';

export class FilterRatingDto {
  @IsEnum(RatingType)
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  id?: string;
}
