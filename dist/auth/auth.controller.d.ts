import { AuthService } from "./auth.service";
import RegisterDto from "./dto/register.dto";
import RequestWithUser from "./interface/requestWithUser.interface";
import { Response } from "express";
import { UserService } from "../user/user.service";
import User from "src/user/entities/user.entity";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(registrationForm: RegisterDto): Promise<User>;
    login(request: RequestWithUser): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(response: Response): Promise<Response<any, Record<string, any>>>;
    authenticate(request: RequestWithUser): User;
    refreshAccessToken(request: RequestWithUser): Promise<{
        accessToken: string;
    }>;
}
