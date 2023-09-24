import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstituteService } from './institute.service';
import { CourseController } from './institute.controller';
import { InstituteSchema } from './entities/institute.schema';
import { ModelNames } from 'src/common/models.enum';
import { UserSchema } from 'src/user/entities/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.Institute, schema: InstituteSchema },
      { name: ModelNames.User, schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [CourseController],
  providers: [InstituteService],
})
export class InstituteModule {}
