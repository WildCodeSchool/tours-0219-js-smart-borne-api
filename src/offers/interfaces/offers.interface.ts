import { Document } from 'mongoose';

export interface Offer extends Document {
  id: String;
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
