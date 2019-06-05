export class CreateOfferDto {
  readonly id: string;
  readonly client: string;
  readonly remise: number;
  readonly débutOffre: Date;
  readonly couponsRestants: number;
  readonly couponsImprimés: number;
  readonly totalRemisé: number;
  readonly détails: string;
}
