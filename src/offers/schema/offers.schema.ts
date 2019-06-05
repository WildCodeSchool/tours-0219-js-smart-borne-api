import * as mongoose from "mongoose";

export const OfferSchema = new mongoose.Schema({
  id: Number,
  client: String,
  remise: Number,
  debutOffre: Date,
  couponsRestants: Number,
  couponsImprimés: Number,
  totalRemisé: Number,
  details: String
});
