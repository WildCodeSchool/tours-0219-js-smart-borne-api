export interface Offer {
  id: String;
  client: String;
  remise: String;
  débutOffre: String;
  coupons: {
    Restants: String,
    Imprimés: String,
  };
  totalRemisé: String;
  détails: String;
}
