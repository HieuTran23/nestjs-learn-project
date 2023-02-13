import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import TokenPayload from "../interface/tokenPayload.interface";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
  ) {
    constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromBodyField,
        secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        passReqToCallback: true,
      });
    }
  
    async validate(request: Request, payload: TokenPayload) {
        console.log(request)
    //   const refreshToken = request;
    //   return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
    }
  }