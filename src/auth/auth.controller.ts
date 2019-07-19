import {
  Body,
  Controller, HttpStatus,
  Post, UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../shared/interfaces/user.interface';
import { UserService } from '../shared/services/user.service';
import { CreateUserDto } from '../user/dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly  userService: UserService) {
  }

  /**
   * Login
   * @param user
   */
  @ApiOperation({ title: 'Login', description: 'Login user. Generate a new valid JWT.' })
  @ApiResponse({ description: 'JWT successfully created.',
    status: HttpStatus.CREATED, type: LoginDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  @Post('login')
  async login(@Body() user: LoginDto): Promise<User> {
    return await this.authService.authenticate(user);
  }

  /**
   * Register
   * @param userModel
   */
  @ApiOperation({ title: 'Sign-up', description: 'Register user. Returns a valid JWT.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: LoginDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  @Post('/register')
  async register(@Body() userModel: CreateUserDto): Promise<User> {
    const emailExists = await this.userService.findByEmail(userModel.email);

    if (emailExists) {
      throw new UnprocessableEntityException();
    }
    return await this.userService.create(userModel);
  }

}
