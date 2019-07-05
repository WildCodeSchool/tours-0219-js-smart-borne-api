import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Taux {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly bacUn: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly bacDeux: number = 0;
}

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly restant: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly imprimer: number = 0;
}
class Plastique {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly utilise: number = 0;
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly total: number = 0;
}

class Cannette {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly utilise: number = 0;
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
  @ApiModelProperty() readonly cannettes: number = 0;

}

export class CreateBorneDto {
  @IsNotEmpty()
  @ApiModelProperty() readonly numeroSerie: string;
  @IsNotEmpty()
  @ApiModelProperty() readonly address: {
    readonly numero: string,
    readonly rue: string,
    readonly ville: string,
    readonly codePostal: string,
  };
  @Type(() => Plastique)
  @ValidateNested()
  @ApiModelProperty()readonly plastique: Plastique;

  @Type(() => Cannette)
  @ValidateNested()
  @ApiModelProperty() readonly cannette: Cannette;

  @Type(() => Taux)
  @ValidateNested()
  @ApiModelProperty() readonly taux: Taux;
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
