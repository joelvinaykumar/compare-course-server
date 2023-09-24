import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export const RatingSchema = new Schema(
  {
    overall: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
    content: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    placement: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
    faculty: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
    doubt_solving: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
    pros: {
      type: String,
      required: true,
    },
    cons: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: false,
    },
    created_by: {
      type: ObjectId,
      required: false,
    },
    self_declaration: {
      type: Boolean,
      required: true,
    },
    anonymous: {
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
