import * as mongoose from "mongoose";

export const OfferSchema = new mongoose.Schema({
  id: String,
  client: String,
  remise: String,
  debutOffre: String,
  coupons: {
    Restants: String,
    Imprimés: String
  },
  totalRemisé: String,
  details: String
});
