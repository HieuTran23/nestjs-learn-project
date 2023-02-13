import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from './interface/requestWithUser.interface';
import {Response} from 'express'
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import { UserService } from 'src/user/user.service';
import JwtRefreshGuard from './guard/jwt-refresh-token.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(@Body() registrationForm: RegisterDto){
        return this.authService.register(registrationForm);
    }

    @Post('login')
    @UseGuards(LocalAuthenticationGuard)
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const {user} = request
        const accessToken = await this.authService.signAccessToken(user.id, user.email)
        const refreshToken = await this.authService.signRefreshToken(user.id, user.email)

        await this.userService.setCurrentRefreshToken(refreshToken, user.id)

        return response.send({accessToken, refreshToken})
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logout(@Res() response: Response) {
        return response.sendStatus(200)
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser){
        const user =request.user;
        user.hashPassword = undefined
        return user
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    refresh(@Req() request: RequestWithUser) {
        const {user} = request

        const accessToken = this.authService.signAccessToken(user.id, user.email)

        return accessToken
    }
}
