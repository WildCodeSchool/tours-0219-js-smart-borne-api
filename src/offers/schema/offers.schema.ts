import * as mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
  id: String,
  client: String,
  remise: String,
  debutOffre: String,
  coupons: {
    restants: String,
    imprimes: String,
  },
  totalRemise: String,
  details: String,
});
