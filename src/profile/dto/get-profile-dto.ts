import { ApiModelProperty } from '@nestjs/swagger';

export class GetProfileDto {
  // tslint:disable-next-line:variable-name
  @ApiModelProperty() _id: string;
  @ApiModelProperty() username: string;
  @ApiModelProperty() email: string;
  @ApiModelProperty() role: string;
}
