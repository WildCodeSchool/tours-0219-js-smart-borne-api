import * as mongoose from 'mongoose';
import { offerSchema } from './offers.schema';
import { client } from './client.schema';

export const borneSchema = new mongoose.Schema(
  {
    numeroSerie: String,
    pseudo: String,
    address: {
      numero: String,
      rue: String,
      ville: String,
      codePostal: String,
    },
    dateInstallation: String,
    coupon: {
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
    client: { ...client },
  },
  {
    versionKey: false,
  });
