import { Schema } from 'mongoose';
import { ModelNames } from '../../common/models.enum';
import { ClassTypes, CourseMode, CourseType } from './course.enum';

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
});

export const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    average_rating: {
      type: Number,
      required: false,
      default: 0,
    },
    class_type: {
      type: String,
      enum: ClassTypes,
      required: false,
      default: ClassTypes.Online,
    },
    type: {
      type: String,
      enum: CourseType,
      required: false,
      default: CourseType.Certifications,
    },
    mode: {
      type: String,
      enum: CourseMode,
      required: false,
      default: CourseMode.Micro,
    },
    instructors: {
      type: [AuthorSchema],
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    curricuulum: {
      type: [String],
      required: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: ModelNames.Institute,
    },
    ratings: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: ModelNames.Rating,
    },
    price: {
      type: Number,
      required: false,
    },
    no_of_hours: {
      type: Number,
      required: false,
    },
    provides_certificate: {
      type: Boolean,
      required: false,
    },
    provides_support: {
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
