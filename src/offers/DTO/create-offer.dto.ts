export class CreateOfferDto {
  readonly client: string;
  readonly remise: string;
  readonly debutOffre: string;
  readonly couponsRestants: number;
  readonly couponsImprimes: number;
  readonly totalRemise: string;
  readonly details: string;
}
