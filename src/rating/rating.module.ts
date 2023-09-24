import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ModelNames } from 'src/common/models.enum';
import { RatingSchema } from './entities/rating.schema';
import { CourseSchema } from 'src/course/entities/course.schema';
import { CourseModule } from 'src/course/course.module';
import { CourseService } from 'src/course/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.Rating, schema: RatingSchema },
      { name: ModelNames.Course, schema: CourseSchema },
    ]),
    CourseModule,
  ],
  controllers: [RatingController],
  providers: [RatingService, CourseService],
})
export class RatingModule {}
