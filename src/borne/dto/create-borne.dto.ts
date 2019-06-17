import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class Taux {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly bacUn: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly bacDeux: number = 0;
}

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly restant: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly imprimer: number = 0;
}

class Total {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly recycle: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly remise: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly cannettes: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly plastique: number = 0;
}

export class CreateBorneDto {
  @IsNotEmpty()
  readonly numeroSerie: string;
  @IsNotEmpty()
  readonly address: {
    readonly numero: string,
    readonly rue: string,
    readonly ville: string,
    readonly codePostal: string,
  };
  @Type(() => Taux)
  @ValidateNested()
  readonly taux: Taux;
  @IsNotEmpty()
  readonly dateInstallation: string;
  @Type(() => Coupon)
  @ValidateNested()
  readonly coupons: Coupon;

  @Type(() => Total)
  @ValidateNested()
  readonly total: Total;
  readonly problemesTechniques: string;
  readonly styliseeClient: string;
  readonly details: string;
}
