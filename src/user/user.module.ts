import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { UserController } from './user.controller';
import { UserSchema } from './entities/user.schema';
import { UserService } from './user.service';
import { ModelNames } from '../common/models.enum';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.User, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: {
        expiresIn: `${60 * 60 * 6}s`,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
