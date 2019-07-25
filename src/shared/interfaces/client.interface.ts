import { Document, Types } from 'mongoose';
import { Borne } from './borne.interface';
import { Offer } from './offers.interface';

export interface Client extends Document {
  name: String;
  siret: String;
  raisonSocial: String;
  address: {
    numero: String,
    nomRue: String,
    departement: String,
    ville: String,
  };
  contrat: {
    debut: String,
    fin: String,
  };
  siege: {
    email: String,
    telephone: String,
  };
  gerant: {
    name: String,
    email: String;
    telephone: String,
  };
  coupon:{
    total: Number,
    imprimer: Number,
    restant: Number,
  };
  plastiqueTotal: Number;
  cannetteTotal: Number;
  bornes: Types.DocumentArray<Borne>;
  offer: Types.DocumentArray<Offer>;
}
