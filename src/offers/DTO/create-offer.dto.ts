import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly imprime: number = 0;
}

export class CreateOfferDto {

  readonly client: string;
  readonly remise: string;

  readonly contrat: {
    readonly debut: string;
    readonly fin: string;
  };
  @Type(() => Coupon)
  @ValidateNested()
  readonly coupon: Coupon;
  readonly total: string;
}
