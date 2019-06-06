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
  readonly coupon:{
    readonly total: number;
    readonly imprimer: number;
    readonly restant: number;
  };
}
