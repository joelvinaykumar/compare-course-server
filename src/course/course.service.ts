import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';

import { Course } from './entities/course.interface';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ModelNames } from '../common/models.enum';
import { FilterCourseDto } from './dto/filter-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(ModelNames.Course)
    private courseModel: Model<Course>,
    private logger: Logger,
  ) {
    this.logger = new Logger(CourseService.name);
  }

  async create(input: CreateCourseDto) {
    try {
      const newCourse = await this.courseModel.create(input);
      return await newCourse.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: any, query?: FilterCourseDto) {
    try {
      let q: any = {};
      if (query?.title) {
        q = { $regex: new RegExp(query.title, 'i') };
      }
      if (query?.type) {
        q = { ...query, type: query.type };
      }
      if (query?.company) {
        q = { ...query, company: query.company };
      }
      console.log(q);
      return await this.courseModel.find({
        ...q,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPublic(query?: FilterCourseDto) {
    try {
      let q: any = {};
      if (query?.title) {
        q = { $regex: new RegExp(query.title, 'i') };
      }
      if (query?.type) {
        q = { ...query, type: { $in: query.type } };
      }
      if (query?.classType) {
        q = { ...query, class_type: { $in: query.classType } };
      }
      if (query?.mode) {
        q = { ...query, mode: { $in: query.mode } };
      }
      if (query?.rating) {
        q = { ...query, average_rating: { $lte: Number(query.rating) } };
      }
      if (query?.company) {
        q = { ...query, company: query.company };
      }
      this.logger.log(JSON.stringify(q));
      return await this.courseModel.find({
        ...q,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllLite(user: any, query?: FilterCourseDto) {
    try {
      let q: any = {};
      if (query?.title) {
        q = { $regex: new RegExp(query.title, 'i') };
      }
      if (query?.company) {
        q = { ...query, company: query.company };
      }
      return await this.courseModel
        .find({
          ...q,
        })
        .select(['_id', 'title']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      return await this.courseModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, input: UpdateCourseDto & QueryOptions<Course>) {
    try {
      return await this.courseModel.findByIdAndUpdate(id, input, { new: true });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.courseModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
