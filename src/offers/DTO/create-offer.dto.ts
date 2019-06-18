import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';



class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly imprimer: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly total: number = 0;
}

export class CreateOfferDto {
  @IsNotEmpty()
  readonly client: string;
  @IsNotEmpty()
  readonly remise: string;
  @IsNotEmpty()
  readonly contrat: {
    readonly debut: string;
    readonly fin: string;
  }
  @Type(() => Coupon)
  @ValidateNested()
  readonly coupon: Coupon;
}