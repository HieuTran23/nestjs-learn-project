import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import TokenPayload from "../interface/tokenPayload.interface";
import { Request } from "express";
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(req: Request, payload: TokenPayload): Promise<{
        id: number;
        email: string;
    }>;
}
export {};
