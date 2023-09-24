import { Schema } from 'mongoose';
import { ModelNames } from '../../common/models.enum';
import { InstituteMode, InstituteType } from './institute.enum';

const FacultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
});

export const InstituteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: InstituteType,
      required: false,
    },
    mode: {
      type: [String],
      enum: InstituteMode,
      required: false,
    },
    faculty: {
      type: [FacultySchema],
      required: false,
    },
    courses: {
      type: [Schema.Types.ObjectId],
      ref: ModelNames.Course,
      required: false,
    },
    admin: {
      type: [Schema.Types.ObjectId],
      ref: ModelNames.User,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
