import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    try {
      // Find User
      // Sign JWT and repsond
    } catch (e: any) {
      return new HttpException(e.message, 400);
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
