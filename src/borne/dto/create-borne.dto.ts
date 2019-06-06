export class CreateBorneDto {
  readonly numeroSerie: string;
  readonly address: {
    readonly numero: string,
    readonly rue: string,
    readonly ville: string,
    readonly codePostal: string,
  };
  readonly taux: {
    readonly bacUn: string,
    readonly bacDeux: string,
  };
  readonly dateInstallation: string;
  readonly coupons: {
    readonly restant: string,
    readonly imprimer: string,
  };
  readonly total: {
    readonly recycle: string,
    readonly remise: string,
    readonly cannettes: string,
    readonly plastique: string,
  };
  readonly problemesTechniques: string;
  readonly styliseeClient: string;
  readonly details: string;
}
