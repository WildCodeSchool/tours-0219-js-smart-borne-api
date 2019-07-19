import { Get, Controller, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from '../shared/services/user.service';
import { GetProfileDto } from './dto/get-profile-dto';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('profile')
@Controller('profile')
export class ProfileController {

  /**
   * @param userService
   */
  constructor(private readonly userService: UserService) {
  }

  /**
   * @param req
   */
  @ApiOperation({ title: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Return profile.' })
  @Get()
    async getProfile(@Req() req): Promise<GetProfileDto> {
    return await this.userService.findByEmail(req.user.email);
  }

  /**
   * @param id
   */
  @ApiOperation({ title: 'Get profile by Id' })
  @ApiResponse({ status: 200, description: 'Return profile by Id.' })
  @Get(':id')
    async findOne(@Param('id') id: string): Promise<GetProfileDto> {
    return await this.userService.findOne(id);
  }

}
