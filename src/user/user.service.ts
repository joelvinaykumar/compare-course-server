import { HttpException, Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { PasswordCrypt } from 'password-crypt';
import { Model } from 'mongoose'

import { User } from './entities/user.interface';
import { CreateUsereDto } from './entities/user.dto';
import { ModelNames } from 'src/common/models.enum';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(ModelNames.User)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ){}
  
  private pCrypt = new PasswordCrypt({
    secret: process.env.PASS_KEY
  });

  private hash = (pwd: string) => this.pCrypt.hash(pwd);
  
  async signUp(input: CreateUsereDto) {
    try {
      Logger.log(JSON.stringify(input))
      const newUser = this.userModel.create({
        ...input,
        password: await this.hash(String(input.password))
      })
      return (await newUser).save()
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        const success = this.pCrypt.compare(password, user.password);
        if (success) {
          const { email, name } = user.toJSON();
          return {
            access_token: this.jwtService.sign({ name, email })
          };
        } else {
          throw new UnauthorizedException('Incorrect Password');
        }
      } else {
        throw new NotFoundException('User not found')
      }
    } catch (error) {
      throw new HttpException(error.message, error.http_code || 500);
    }
  }

  findUsers() {
    return {}
  }
}
