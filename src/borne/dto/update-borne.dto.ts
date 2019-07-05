import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBorneDto {
  @ApiModelProperty() readonly numeroSerie: String;
  @ApiModelProperty() readonly address: {
    readonly numero: String,
    readonly rue: String,
    readonly ville: String,
    readonly codePostal: String,
  };
  @ApiModelProperty() readonly dateInstallation: String;
  @ApiModelProperty() readonly problemesTechniques: String;
  @ApiModelProperty() readonly styliseeClient: String;
  @ApiModelProperty() readonly details: String;
}
