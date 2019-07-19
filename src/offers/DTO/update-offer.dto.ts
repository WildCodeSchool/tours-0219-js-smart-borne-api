import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Contrat {
  @ApiModelProperty() readonly debut: string;
  @ApiModelProperty() readonly fin: string;
}

export class UpdateOfferDto {

  @ApiModelProperty() readonly pseudo: string;
  @ApiModelProperty() readonly client: string;
  @ApiModelProperty() readonly remise: string;

  @Type(() => Contrat)
  @ValidateNested()
  @ApiModelProperty() readonly contrat: Contrat;

  @ApiModelProperty() readonly imprime: number;
  @ApiModelProperty() readonly total: string;
  @ApiModelProperty() readonly details: string;
}
