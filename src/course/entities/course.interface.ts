import { Document } from 'mongoose';

import { ClassTypes, CourseMode, CourseType } from './course.enum';

interface Instructor {
  readonly name: string;
  readonly picture?: string;
}

export interface Course extends Document {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly company: string;
  readonly average_rating?: number;
  readonly class_type?: ClassTypes;
  readonly type?: CourseType;
  readonly mode?: CourseMode;
  readonly instructors?: Instructor[];
  readonly ratings?: string[];
  readonly link?: string;
  readonly price?: number;
  readonly no_of_hours?: number;
  readonly provides_certificate?: boolean;
  readonly provides_support?: boolean;
  readonly curricuulum?: string[];
}
