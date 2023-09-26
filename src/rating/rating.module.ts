import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ModelNames } from '../common/models.enum';
import { RatingSchema } from './entities/rating.schema';
import { CourseSchema } from '../course/entities/course.schema';
import { CourseModule } from '../course/course.module';
import { CourseService } from '../course/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.Rating, schema: RatingSchema },
      { name: ModelNames.Course, schema: CourseSchema },
    ]),
    CourseModule,
  ],
  controllers: [RatingController],
  providers: [RatingService, CourseService, Logger],
})
export class RatingModule {}
