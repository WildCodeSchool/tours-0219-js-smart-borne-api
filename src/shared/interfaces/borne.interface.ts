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
  taux: {
    bacUn: Number,
    bacDeux: Number,
  };
  dateInstallation: String;
  coupon: {
    restant: Number,
    imprimer: Number,
  };
  plastique: {
    utilise: Number,
    total: Number,
  };
  cannette: {
    utilise: Number,
    total: Number,
  };
  total: {
    recycle: Number,
    remise: Number,
    cannettes: Number,
  };
  problemesTechniques: String;
  styliseeClient: String;
  details: String;
  offers: Types.DocumentArray<Offer>;
}
