export class UpdateClientDto {
    readonly name: string;
    readonly siret: string;
    readonly raisonSocial: string;
    readonly address: {
        readonly numero: string;
        readonly nomRue: string;
        readonly departement: string;
        readonly ville: string;
    }
    contrat: {
        readonly debut: string;
        readonly fin: string;
    }
    siege: {
        readonly email: string;
        readonly telephone: string;
    }
    gerant: {
        readonly name: string;
        readonly email: string;
        readonly telephone: string;
    }
    coupon:{
        readonly total: number;
        readonly imprimer: number;
        readonly restant: number;
    }
}