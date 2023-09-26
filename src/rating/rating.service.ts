import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ModelNames } from '../common/models.enum';
import { Rating } from './entities/rating.interface';
import { User } from '../user/entities/user.interface';
import { CreateRatingDto } from './dto/create-rating.dto';
import { CourseService } from '../course/course.service';
import { FilterRatingDto } from './dto/filter-review.dto';

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

  async findAll(user: User, query: FilterRatingDto) {
    try {
      let q: any = {};
      if (query.type === 'user') {
        q = { ...q, created_by: user.id };
      }
      if (query.type === 'course') {
        q = { ...q, course: query.id };
      }
      if (query.type === 'company') {
        q = { ...q, company: query.id };
      }
      return await this.ratingModel.find(q);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
