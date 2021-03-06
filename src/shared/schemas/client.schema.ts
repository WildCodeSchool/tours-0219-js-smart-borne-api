import * as mongoose from 'mongoose';
import { borneSchema } from './borne.schema';
import { offerSchema } from './offers.schema';

export const client = {
  name: String,
  siret: String,
  raisonSocial: String,
  address: {
    numero: String,
    nomRue: String,
    departement: String,
    ville: String,
  },
  contrat: {
    debut: String,
    fin: String,
  },
  siege: {
    email: String,
    telephone: String,
  },
  gerant: {
    name: String,
    email: String,
    telephone: String,
  },
  coupon: {
    total: Number,
    imprimer: Number,
    restant: Number,
  },
  plastiqueTotal: Number,
  cannetteTotal: Number,
  offer: [offerSchema],

};

export const clientSchema = new mongoose.Schema(
  {
    ...client,
    bornes: [borneSchema],

  },
  {
    versionKey: false,
  });
