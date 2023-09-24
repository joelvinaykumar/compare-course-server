import { Document } from 'mongoose';
import { Institute } from '../../institute/entities/institute.interface';
import { UserRole } from './user.enum';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly picture?: string;
  readonly role: UserRole;
  readonly organization?: Institute;
  readonly password?: string;
}
