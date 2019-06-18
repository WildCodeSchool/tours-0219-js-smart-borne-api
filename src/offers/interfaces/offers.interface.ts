import { Document } from 'mongoose';

export interface Offer extends Document {
  client: String;
  remise: String;
  contrat: {
    debut: String;
    fin: String;
  },
  coupon: {
    imprime: Number;
    total: String;
  },
}
