import { Schema } from 'mongoose';

export const RatingSchema = new Schema({
  courseTeaching: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  content: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  material: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  faculty: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  placement: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: false
  }
})