import { Document } from 'mongoose';

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
  coupons: {
    restant: Number,
    imprimer: Number,
  };
  total: {
    recycle: Number,
    remise: Number,
    cannettes: Number,
    plastique: Number,
  };
  problemesTechniques: String;
  styliseeClient: String;
  details: String;
}
