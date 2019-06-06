export class CreateOfferDto {
  readonly id: string;
  readonly client: string;
  readonly remise: string;
  readonly débutOffre: string;
  readonly coupons: {
    readonly Restants: string;
    readonly Imprimés: string;
  };
  readonly totalRemisé: string;
  readonly détails: string;
}
