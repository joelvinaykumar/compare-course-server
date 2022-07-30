import { Document } from "mongoose"

import { ClassTypes, CourseMode, CourseType } from "./course.enum";

interface Instructor {
  readonly name: string;
  readonly picture?: string;
}

export interface Course extends Document {
  readonly title: string;
  readonly description: string;
  readonly average_rating?: number;
  readonly class_type?: ClassTypes;
  readonly type?: CourseType;
  readonly mode?: CourseMode;
  readonly instructor?: Instructor[];
  readonly link?: string;
  readonly curricuulum?: string[];
}