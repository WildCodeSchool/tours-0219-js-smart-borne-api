import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly imprimer: number = 0;
}
class Plastique {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly taux: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly total: number = 0;
}

class Metal {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly taux: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly total: number = 0;
}

class Total {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly recycle: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly remise: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly coupons: number = 0;

}

class Address {
  @ApiModelProperty() readonly numero: string;
  @ApiModelProperty() readonly rue: string;
  @ApiModelProperty()  readonly ville: string;
  @ApiModelProperty()   readonly codePostal: string;
}

export class CreateBorneDto {
  @IsNotEmpty()
  @ApiModelProperty() readonly numeroSerie: string;
  @IsNotEmpty()
  @Type(() => Address)
  @ValidateNested()
  @ApiModelProperty() readonly address: Address;
  @Type(() => Plastique)
  @ValidateNested()
  @ApiModelProperty()readonly plastique: Plastique;

  @Type(() => Metal)
  @ValidateNested()
  @ApiModelProperty() readonly metal: Metal;

  @IsNotEmpty()
  @ApiModelProperty() readonly dateInstallation: string;

  @Type(() => Coupon)
  @ValidateNested()
  @ApiModelProperty() readonly coupon: Coupon;

  @Type(() => Total)
  @ValidateNested()
  @ApiModelProperty() readonly total: Total;

  @ApiModelProperty() readonly problemesTechniques: string;
  @ApiModelProperty() readonly styliseeClient: string;
  @ApiModelProperty() readonly details: string;
}
