import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ModelNames } from '../common/models.enum';
import { Rating } from './entities/rating.interface';
import { User } from '../user/entities/user.interface';
import { CreateRatingDto } from './dto/create-rating.dto';
import { CourseService } from '../course/course.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(ModelNames.Rating)
    private ratingModel: Model<Rating>,
    private courseService: CourseService,
  ) {}

  async createReview(user: User, input: CreateRatingDto) {
    try {
      let q: any = { ...input };
      if (!input.anonymous) {
        q = { ...q, created_by: user.id };
      }
      const newRating = await this.ratingModel.create(q);
      const res = await newRating.save();
      await this.courseService.update(input.course, {
        $push: { ratings: res._id },
      });
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: User) {
    try {
      return await this.ratingModel.find({
        created_by: user.id,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
