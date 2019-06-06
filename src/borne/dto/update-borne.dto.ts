export class UpdateBorneDto {
  readonly ville: String;
  readonly numeroSerie: String;
  readonly address: {
    readonly numero: String,
    readonly rue: String,
    readonly ville: String,
    readonly codePostal: String,
  };
  readonly taux: {
    readonly bacUn: String,
    readonly bacDeux: String,
  };
  readonly dateInstallation: String;
  readonly coupons: {
    readonly restant: String,
    readonly imprimer: String,
  };
  readonly total: {
    readonly recycle: String,
    readonly remise: String,
    readonly cannettes: String,
    readonly plastique: String,
  };
  readonly problemesTechniques: String;
  readonly styliseeClient: String;
  readonly details: String;
}
