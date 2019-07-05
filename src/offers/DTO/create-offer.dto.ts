import { IsInt, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

class Coupon {
  @IsInt()
  @Min(0)
  @Max(0)
  @ApiModelProperty() readonly imprime: number = 0;
}

export class CreateOfferDto {

  @ApiModelProperty() readonly client: string;
  @ApiModelProperty() readonly remise: string;

  @ApiModelProperty() readonly contrat: {
    readonly debut: string;
    readonly fin: string;
  };
  @Type(() => Coupon)
  @ValidateNested()
  @ApiModelProperty() readonly coupon: Coupon;
  @ApiModelProperty() readonly total: string;
}
