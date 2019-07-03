import {
  Body,
  Controller,
  Post, UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../shared/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly  userService: UserService) {
  }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<User> {
    return await this.authService.authenticate(user);
  }

  @Post('/register')
  async register(@Body() userModel: CreateUserDto): Promise<User> {
    const emailExists = await this.userService.findByEmail(userModel.email);

    if (emailExists) {
      throw new UnprocessableEntityException();
    }
    return await this.userService.create(userModel);
  }

}
