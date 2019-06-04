import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    siret: Number,
    raisonSocial: String,
    name: String,
    ville: String,
    debutContrat: String,
    finContrat: String,
    address: String,
    emailSiege: String,
    emailGerant: String,
    telephoneSiege: Number,
    telephoneGerrant: Number,
    nombreTotalCouponImprimes: Number
})