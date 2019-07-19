import { Document } from 'mongoose';
import { Borne } from './borne.interface';

export interface Data extends Document {
  type: String;
  date: Date;
  borne: Borne;
  plastique: Number;
  metal: Number;
}
