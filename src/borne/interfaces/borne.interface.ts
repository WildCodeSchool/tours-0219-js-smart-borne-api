import { Document } from 'mongoose';

export interface Borne extends Document{
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
}
