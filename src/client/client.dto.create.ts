import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly total: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly imprimer: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly restant: number = 0;
}

export class CreateClientDto {
  @ApiModelProperty() readonly name: string;
  @ApiModelProperty() readonly siret: string;
  @ApiModelProperty() readonly raisonSocial: string;
  @ApiModelProperty() readonly address: {
    readonly numero: string;
    readonly nomRue: string;
    readonly departement: string;
    readonly ville: string;
  };
  @ApiModelProperty() readonly contrat: {
    readonly debut: string;
    readonly fin: string;
  };
  @ApiModelProperty() readonly siege: {
    readonly email: string;
    readonly telephone: string;
  };
  @ApiModelProperty() readonly gerant: {
    readonly name: string;
    readonly email: string;
    readonly telephone: string;
  };

  @Type(() => Coupon)
  @ValidateNested()
  @ApiModelProperty() readonly coupon: Coupon;
}
