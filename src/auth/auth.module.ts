import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy, LocalStrategy, LinkedInStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LinkedInStrategy,
    ConfigService,
  ],
})
export class AuthModule {}
