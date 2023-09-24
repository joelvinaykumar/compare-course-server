import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { PasswordCrypt } from 'password-crypt';
import { Model } from 'mongoose';

import { User } from './entities/user.interface';
import { CreateUsereDto } from './entities/user.dto';
import { ModelNames } from 'src/common/models.enum';
import { UserRole } from './entities/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(ModelNames.User)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private pCrypt = new PasswordCrypt({
    secret: process.env.PASS_KEY,
  });

  private hash = (pwd: string) => this.pCrypt.hash(pwd);

  private getAvatarUrl = (name: string) =>
    `https://avatars.dicebear.com/api/avataaars/${name}.svg?mood[]=happy&background=%233867d6`;

  async signUp(input: CreateUsereDto) {
    try {
      const newUser = this.userModel.create({
        ...input,
        picture: input.picture || this.getAvatarUrl(input.name),
        password: await this.hash(String(input.password)),
      });
      return (await newUser).save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userModel
        .findOne({ email })
        .populate('organization');
      if (user) {
        const success = this.pCrypt.compare(password, user.password);
        if (success) {
          const { password, ...userObj } = user.toJSON();
          return {
            access_token: this.jwtService.sign(userObj),
          };
        } else {
          throw new UnauthorizedException('Incorrect Password');
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new HttpException(error.message, error.http_code || 500);
    }
  }

  async findOrReplace(input: any) {
    try {
      const user = await this.userModel.findOne({
        email: input?.emails?.[0]?.value,
      });
      if (user) {
        return {
          access_token: this.jwtService.sign(user.toJSON()),
        };
      } else {
        const newUser = this.userModel.create({
          name: input?.displayName,
          email: input?.emails?.[0]?.value,
          role: UserRole.User,
          picture:
            input?.photos?.[1]?.value || this.getAvatarUrl(input?.displayName),
        });
        const user = (await newUser).save();
        return {
          access_token: this.jwtService.sign((await user).toJSON()),
        };
      }
    } catch (error) {
      throw new HttpException(error.message, error.http_code || 500);
    }
  }

  findUsers() {
    return {};
  }

  async update(_id: string, input: any) {
    try {
      return await this.userModel.updateOne({ _id }, input, { new: true });
    } catch (error) {
      throw new HttpException(error.message, error.http_code || 500);
    }
  }
}
