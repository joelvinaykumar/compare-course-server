import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';

@ApiTags('Rating')
@ApiBearerAuth()
@Controller('review')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: any, @Body() input: CreateRatingDto) {
    return this.ratingService.createReview(user, input);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: any) {
    return this.ratingService.findAll(user);
  }
}
