import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstituteService } from './institute.service';
import { CourseController } from './institute.controller';
import { InstituteSchema } from './entities/institute.schema';
import { ModelNames } from 'src/common/models.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name : ModelNames.Institute, schema : InstituteSchema }
    ]),
  ],
  controllers: [CourseController],
  providers: [InstituteService]
})
export class InstituteModule {}
