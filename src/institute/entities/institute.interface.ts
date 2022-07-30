import { Document } from "mongoose"
import { Course } from "src/course/entities/course.interface";

interface Faculty extends Document {
  name: string;
  picture?: string;
}

export interface Institute extends Document {
  readonly name: string;
  readonly about?: string;
  readonly faculty?: Faculty[];
  readonly courses?: Course[];
  readonly active?: boolean;
}