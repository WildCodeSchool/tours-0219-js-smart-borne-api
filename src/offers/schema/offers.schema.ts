import * as mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
  id: String,
  client: String,
  remise: String,
  debutOffre: String,
  coupons: {
    restants: String,
    imprimés: String,
  },
  totalRemisé: String,
  details: String,
});
