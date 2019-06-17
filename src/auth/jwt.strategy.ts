import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }
  async validate(payload: JwtPayload) {
    // ces ici qu'on va recuperer les valeur de la personne
    const user = await this.authService.validateUser(payload);
    // console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
