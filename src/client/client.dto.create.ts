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

class Address {
  @ApiModelProperty() readonly numero: string;
  @ApiModelProperty() readonly nonRue: string;
  @ApiModelProperty() readonly departement: string;
  @ApiModelProperty() readonly ville: string;
}

class Contrat {
  @ApiModelProperty() readonly debut: string;
  @ApiModelProperty() readonly fin: string;
}

class Siege {
  @ApiModelProperty() readonly email: string;
  @ApiModelProperty() readonly telephone: string;
}

class Gerant {
  @ApiModelProperty() readonly name: string;
  @ApiModelProperty() readonly email: string;
  @ApiModelProperty() readonly telephone: string;
}

export class CreateClientDto {
  @ApiModelProperty() readonly name: string;
  @ApiModelProperty() readonly siret: string;
  @ApiModelProperty() readonly raisonSocial: string;
  @Type(() => Address)
  @ValidateNested()
  @ApiModelProperty() readonly address: Address;
  @Type(() => Contrat)
  @ValidateNested()
  @ApiModelProperty() readonly contrat: Contrat;
  @Type(() => Siege)
  @ValidateNested()
  @ApiModelProperty() readonly siege: Siege;
  @Type(() => Gerant)
  @ValidateNested()
  @ApiModelProperty() readonly gerant: Gerant;
  @Type(() => Coupon)
  @ValidateNested()
  @ApiModelProperty() readonly coupon: Coupon;
}
