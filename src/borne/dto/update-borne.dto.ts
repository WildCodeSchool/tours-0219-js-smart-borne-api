export class UpdateBorneDto {
  readonly numeroSerie: String;
  readonly address: {
    readonly numero: String,
    readonly rue: String,
    readonly ville: String,
    readonly codePostal: String,
  };
  readonly dateInstallation: String;
  readonly problemesTechniques: String;
  readonly styliseeClient: String;
  readonly details: String;
}
