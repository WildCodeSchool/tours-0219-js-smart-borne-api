import * as mongoose from 'mongoose';

export const borneSchema = new mongoose.Schema({
  ville: String,
  numerodeSerie: String,
  raisonSociale: String,
  numeroEtNomDeRue: String,
  dateInstallation: String,
  tauxDeRemplissage1erBac: Number,
  tauxDeRemplissage2emeBac: Number,
  nombreDeCouponsRestant: Number,
  nombreDeCouponsImprimesDepuisInstallation: Number,
  totalRecycleDepuisInstallation: Number,
  totalRemiseDepuisInstallation: Number,
  totalCannettesRecycleesDepuisInstallation: Number,
  totalPlastiquesRecyclesDepuisInstallation: Number,
  problemesTechniques: String,
  styliseeClient: String,
  detailsSupplementaires: String,
}, {
  versionKey: false
});
