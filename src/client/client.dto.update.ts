import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiModelProperty() readonly name: string;
  @ApiModelProperty() readonly siret: string;
  @ApiModelProperty() readonly raisonSocial: string;
  @ApiModelProperty() readonly address: {
    readonly numero: string;
    readonly nomRue: string;
    readonly departement: string;
    readonly ville: string;
  };
  @ApiModelProperty() contrat: {
    readonly debut: string;
    readonly fin: string;
  };
  @ApiModelProperty() siege: {
    readonly email: string;
    readonly telephone: string;
  };
  @ApiModelProperty() gerant: {
    readonly name: string;
    readonly email: string;
    readonly telephone: string;
  };
  @ApiModelProperty() coupon:{
    readonly total: number;
    readonly imprimer: number;
    readonly restant: number;
  };
  readonly plastiqueTotal: number;
  readonly cannetteTotal: number;
}
