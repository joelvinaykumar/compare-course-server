import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_URL } from './common/constants';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { InstituteModule } from './institute/institute.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    AuthModule,
    UserModule,
    CourseModule,
    InstituteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
