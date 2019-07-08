import { Document, Types } from 'mongoose';
import { Offer } from './offers.interface';

export interface Borne extends Document {
  numeroSerie: String;
  address: {
    numero: String,
    rue: String,
    ville: String,
    codePostal: String,
  };
  dateInstallation: String;
  coupon: {
    restant: Number,
    imprimer: Number,
  };
  plastique: {
    taux: Number,
    total: Number,
  };
  metal: {
    taux: Number,
    total: Number,
  };
  total: {
    recycle: Number,
    remise: Number,
    coupons: Number,
  };
  problemesTechniques: String;
  styliseeClient: String;
  details: String;
  offers: Types.DocumentArray<Offer>;
}
