import RegisterDto from "./dto/register.dto";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import User from "src/user/entities/user.entity";
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService);
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(registerForm: RegisterDto): Promise<User>;
    getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User>;
    refreshAccessToken(user: User, refreshToken: string): Promise<{
        accessToken: string;
    }>;
    signAccessToken(userId: number, email: string): Promise<string>;
    signRefreshToken(userId: number, email: string): Promise<string>;
}
