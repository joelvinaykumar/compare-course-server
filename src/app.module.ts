import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_URL } from './common/constants';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { InstituteModule } from './institute/institute.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    AuthModule,
    UserModule,
    CourseModule,
    InstituteModule,
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        apiKey: cfg.get('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
