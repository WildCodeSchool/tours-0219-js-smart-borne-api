import * as mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
  client: String,
  remise: String,
  debutOffre: String,
  couponsRestants: Number,
  couponsImprimes: Number,
  totalRemise: String,
  details: String,
});
