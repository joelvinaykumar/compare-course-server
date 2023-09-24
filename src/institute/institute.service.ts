import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'generate-password';

import { ModelNames } from '../common/models.enum';
import { Institute } from './entities/institute.interface';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import {
  FilterInstituteDto,
  FilterInstituteLiteDto,
} from './dto/filter-institute.dto';
import { UserRole } from '../user/entities/user.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class InstituteService {
  constructor(
    @InjectModel(ModelNames.Institute)
    private instituteModel: Model<Institute>,
    private userService: UserService,
  ) {}

  async create({
    adminName,
    adminEmail,
    ...input
  }: CreateInstituteDto): Promise<any> {
    try {
      const password = generate({
        length: 10,
        numbers: true,
      });
      const newUser = await this.userService.signUp({
        email: adminEmail,
        name: adminName,
        role: UserRole.Admin,
        password,
      });
      const userRes = await newUser.save();
      const newCompany = await this.instituteModel.create({
        ...input,
        admin: [userRes?._id],
      });
      const companyRes = await newCompany.save();
      await this.userService.update(userRes?._id, {
        organization: companyRes._id,
      });
      return { ...companyRes, password };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(query?: FilterInstituteDto) {
    try {
      return await this.instituteModel
        .find({
          name: { $regex: new RegExp(query.name, 'i') },
          active: true,
          ...query,
        })
        .populate('admin');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllLite(query?: FilterInstituteLiteDto) {
    try {
      return await this.instituteModel
        .find({
          name: { $regex: new RegExp(query.name, 'i') },
          active: true,
          ...query,
        })
        .select(['_id', 'name']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSuggestions(query?: FilterInstituteDto) {
    try {
      return (
        await this.instituteModel.find({
          name: { $regex: new RegExp(query.name, 'i') },
          active: true,
          ...query,
        })
      ).map((i) => ({
        name: i.name,
        id: i._id,
      }));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      return await this.instituteModel.findOne({
        _id: id,
        active: true,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, input: UpdateInstituteDto) {
    try {
      const res = await this.instituteModel.findOneAndUpdate(
        { _id: id, active: true },
        { ...input },
        { new: true },
      );
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async reActivate(id: string) {
    try {
      await this.instituteModel.updateOne(
        { _id: id, active: false },
        { active: true },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deActivate(id: string) {
    try {
      await this.instituteModel.updateOne(
        { _id: id, active: true },
        { active: false },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
