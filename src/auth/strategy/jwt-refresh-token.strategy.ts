import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import TokenPayload from "../interface/tokenPayload.interface";
import {Request} from "express"

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('REFRESH_TOKEN_KEY'),
        passReqToCallback: true,
      });
    }
  
    async validate(req: Request, payload: TokenPayload) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }
  }