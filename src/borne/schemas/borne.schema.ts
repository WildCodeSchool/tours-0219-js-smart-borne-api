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
  coupon: {
    restant: Number,
    imprimer: Number,
  },
  plastique: {
    utilise: Number,
    total: Number,
  },
  cannette: {
    utilise: Number,
    total: Number,
  },
  total: {
    recycle: Number,
    remise: Number,
    cannettes: Number,

  },
  jour: {
    cannetteTotal: Number,
    cannetteUtilise: Number,
    plastiqueTotal: Number,
    plastiqueUtilise: Number,
    couponTotal: Number,
    couponUtilise: Number
  },
  semaine: {
    cannetteTotal: Number,
    cannetteUtilise: Number,
    plastiqueTotal: Number,
    plastiqueUtilise: Number,
    couponTotal: Number,
    couponUtilise: Number
  },
  mois: {
    cannetteTotal: Number,
    cannetteUtilise: Number,
    plastiqueTotal: Number,
    plastiqueUtilise: Number,
    couponTotal: Number,
    couponUtilise: Number
  },
  problemesTechniques: String,
  styliseeClient: String,
  details: String,
},                                             {
  versionKey: false,
});
