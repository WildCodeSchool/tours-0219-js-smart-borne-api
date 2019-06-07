export class CreateOfferDto {
  readonly id: string;
  readonly client: string;
  readonly remise: string;
  readonly debutOffre: string;
  readonly coupons: {
    readonly restants: string;
    readonly imprimes: string;
  };
  readonly totalRemise: string;
  readonly details: string;
}
