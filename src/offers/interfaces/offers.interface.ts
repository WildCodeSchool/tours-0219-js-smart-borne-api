import { Document } from 'mongoose';

export interface Offer extends Document {
  client: String;
  remise: String;
  debutOffre: String;
  couponsRestant: Number;
  couponsImprimes: Number;
  totalRemise: String;
  details: String;
}
