import * as mongoose from 'mongoose';

export const borneSchema = new mongoose.Schema({
  numeroSerie: String,
  address: {
    numero: String,
    rue: String,
    ville: String,
    codePostal: String,
  },
  taux: {
    bacUn: Number,
    bacDeux: Number,
  },
  dateInstallation: String,
  coupons: {
    restant: Number,
    imprimer: Number,
  },
  total: {
    recycle: Number,
    remise: Number,
    cannettes: Number,
    plastique: Number,
  },
  problemesTechniques: String,
  styliseeClient: String,
  details: String,
},                                             {
  versionKey: false,
});
