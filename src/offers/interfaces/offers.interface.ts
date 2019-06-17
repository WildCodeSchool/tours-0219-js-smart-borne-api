import { Document } from 'mongoose';

export interface Offer extends Document {
  client: String;
  remise: String;
  debutOffre: String;
  coupons: {
    restants: String,
    imprimes: String,
  };
  totalRemise: String;
  details: String;
}
