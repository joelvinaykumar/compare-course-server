import { Document } from 'mongoose';
import { Course } from '../../course/entities/course.interface';
import { User } from '../../user/entities/user.interface';
import { InstituteMode, InstituteType } from './institute.enum';

interface Faculty extends Document {
  name: string;
  picture?: string;
}

export interface Institute extends Document {
  readonly name: string;
  readonly logo?: string;
  readonly type: InstituteType;
  readonly mode: InstituteMode;
  readonly about?: string;
  readonly faculty?: Faculty[];
  readonly courses?: Course[];
  readonly admin?: User[];
  readonly active?: boolean;
}
