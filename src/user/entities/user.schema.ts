import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ModelNames } from '../../common/models.enum';
import { UserRole } from './user.enum';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: UserRole,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelNames.Institute,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
