import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from './entities/course.schema';
import { ModelNames } from 'src/common/models.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name : ModelNames.Course, schema : CourseSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
