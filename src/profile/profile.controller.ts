import { Get, Controller, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from '../shared/services/user.service';
import { GetProfileDto } from './dto/get-profile-dto';

import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
    async getProfile(@Req() req): Promise<GetProfileDto> {
    return await this.userService.findByEmail(req.user.email);
  }

  @Get(':id')
    async findOne(@Param('id') id: string): Promise<GetProfileDto> {
    return await this.userService.findOne(id);
  }

}
