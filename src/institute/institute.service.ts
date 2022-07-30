import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose"
import { ModelNames } from 'src/common/models.enum';

import { Institute } from './entities/institute.interface';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { FilterInstituteDto } from './dto/filter-institute.dto';

@Injectable()
export class InstituteService {

  constructor(
    @InjectModel(ModelNames.Institute)
    private instituteModel: Model<Institute>
  ){}

  async create(input: CreateInstituteDto) {
    try {
      const newCourse = await this.instituteModel.create(input)
      return await newCourse.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query?: FilterInstituteDto) {
    try {
      return await this.instituteModel.find({
        name: { $regex: new RegExp(query.name, "i") },
        active: true
        
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      return await this.instituteModel.findOne({
        id,
        active: true
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, input: UpdateInstituteDto) {
    try {
      return await this.instituteModel.updateOne({ id, active: true }, input, { new: true })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      return await this.instituteModel.updateOne({ id, active: true }, { active: false })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
