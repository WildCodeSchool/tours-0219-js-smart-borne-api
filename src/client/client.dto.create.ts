import { IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  readonly total: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly imprimer: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  readonly restant: number = 0;
}

export class CreateClientDto {
  readonly name: string;
  readonly siret: string;
  readonly raisonSocial: string;
  readonly address: {
    readonly numero: string;
    readonly nomRue: string;
    readonly departement: string;
    readonly ville: string;
  };
  readonly contrat: {
    readonly debut: string;
    readonly fin: string;
  };
  readonly siege: {
    readonly email: string;
    readonly telephone: string;
  };
  readonly gerant: {
    readonly name: string;
    readonly email: string;
    readonly telephone: string;
  };

  @Type(() => Coupon)
  @ValidateNested()
  readonly coupon: Coupon;
}
