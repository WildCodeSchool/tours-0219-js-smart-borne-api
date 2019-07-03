import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../shared/interfaces/user.interface';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
    ) {
  }

  async authenticate(user: LoginDto): Promise<any> {

    const users = await this.userService.findByEmail(user.email);
    if (!users) {
      throw new BadRequestException();
    }

    if (!await this.userService.compareHash(user.password, users.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.validateUser(users).then((userData) => {
      if (!userData) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      const users: JwtPayload = {
        email: userData.email,
        password: userData.password,
        role: userData.role };
      const accessToken = this.jwtService.sign(users);

      return {
        accessToken,
      };

    });

  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findByUser(payload.email, payload.password);
  }
}
