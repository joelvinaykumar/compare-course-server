import { Schema } from 'mongoose';
import { ModelNames } from 'src/common/models.enum';

const FacultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  }
})

export const InstituteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false
  },
  faculty: {
    type: [FacultySchema],
    required: false
  },
  courses: {
    type: [Schema.Types.ObjectId],
    ref: ModelNames.Course,
    required: false
  },
  active: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  versionKey: false,
  timestamps: true
});