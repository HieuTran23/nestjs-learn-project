import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterDto from "./dto/register.dto";
import { AuthGuard } from "@nestjs/passport";
import RequestWithUser from "./interface/requestWithUser.interface";
import { Response } from "express";
import JwtAuthenticationGuard from "./guard/jwt-authentication.guard";
import { LocalAuthenticationGuard } from "./guard/localAuthentication.guard";
import { UserService } from "../user/user.service";
import JwtRefreshGuard from "./guard/jwt-refresh-token.guard";
import User from "src/user/entities/user.entity";
import { use } from "passport";
import { LoggingInterceptor } from "src/core/logging.interceptor";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("register")
  async register(@Body() registrationForm: RegisterDto): Promise<User> {
    return this.authService.register(registrationForm);
  }

  @Post("login")
  @UseGuards(LocalAuthenticationGuard)
  async login(
    @Req() request: RequestWithUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { user } = request;
    const data = await this.authService.login(user);
    return data;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  async logout(@Res() response: Response) {
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  async refreshAccessToken(@Req() request: RequestWithUser): Promise<{ accessToken: string }> {
    const { user } = request;
    const refreshToken = request.get("Authorization").replace("Bearer", "").trim();

    const accessToken = this.authService.refreshAccessToken(user, refreshToken);
    return accessToken;
  }
}
