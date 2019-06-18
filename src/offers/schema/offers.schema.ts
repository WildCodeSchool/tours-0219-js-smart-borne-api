import * as mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
  client: String,
  remise: String,
  contrat: {
    debut: String,
    fin: String,
  },
  coupon: {
    imprime: Number,
    total: String,
  },
});
