import * as mongoose from 'mongoose';
import { offerSchema } from './offers.schema';

export const borneSchema = new mongoose.Schema(
  {
    numeroSerie: String,
    address: {
      numero: String,
      rue: String,
      ville: String,
      codePostal: String,
    },
    dateInstallation: String,
    coupon: {
      restant: Number,
      imprimer: Number,
    },
    plastique: {
      taux: Number,
      total: Number,
    },
    metal: {
      taux: Number,
      total: Number,
    },
    total: {
      recycle: Number,
      remise: Number,
      coupons: Number,

    },
    problemesTechniques: String,
    styliseeClient: String,
    details: String,
    offers: [offerSchema],
  },
  {
    versionKey: false,
  });
