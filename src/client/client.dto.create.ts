export class CreateClientDto {
    readonly siret: number;
    readonly raisonSocial: string;
    readonly name: string;
    readonly ville: string;
    readonly debutContrat: string;
    readonly finContrat: string;
    readonly address: string;
    readonly emailSiege: string;
    readonly emailGerant: string;
    readonly telephoneSiege: number;
    readonly telephoneGerrant: number;
    readonly nombreTotalCouponImprimes: number;

}