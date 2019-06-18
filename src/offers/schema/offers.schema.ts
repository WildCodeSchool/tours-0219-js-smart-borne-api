import * as mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
  client: String,
  remise: String,
  contrat: {
    debut: String,
    fin: String,
  },
  coupons: {
    imprimes: String,
    total: String,
  },
});
