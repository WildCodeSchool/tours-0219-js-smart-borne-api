import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly imprime: number = 0;
}

class Contrat {
  @ApiModelProperty() readonly debut: string;
  @ApiModelProperty() readonly fin: string;
}

export class CreateOfferDto {

  @ApiModelProperty() readonly client: string;
  @ApiModelProperty() readonly remise: string;

  @Type(() => Contrat)
  @ValidateNested()
  @ApiModelProperty() readonly contrat: Contrat;
  @Type(() => Coupon)
  @ValidateNested()
  @ApiModelProperty() readonly coupon: Coupon;
  @ApiModelProperty() readonly total: string;
}
