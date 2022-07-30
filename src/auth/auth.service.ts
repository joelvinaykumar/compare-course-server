import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../common/user.enum';

@Injectable()
export class AuthService {

  constructor(
  ) {}
  
  async login(role: User, input: any) {
    const { name, email, imageUrl } = input?.profileObj
    try {
      // Find User
      // Sign JWT and repsond
    } catch (e: any) {
      return new HttpException(e.message, 400)
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
