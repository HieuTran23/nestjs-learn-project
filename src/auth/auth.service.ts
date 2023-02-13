import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import * as argon from 'argon2'
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerForm: RegisterDto) {
        const hashPassword = await argon.hash(registerForm.password);
        try{
            const createdUser = await this.userService.create({
                ...registerForm,
                hashPassword: hashPassword
            })
            return createdUser
        } catch (err) {
            if (err?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword( user.hashPassword, plainTextPassword)
            return user
        } catch (err) {
            throw new HttpException('Wrong email/password', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await argon.verify(
            plainTextPassword,
            hashedPassword,
        )
        if(!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async signAccessToken(userId: number, email: string): Promise<string>{
        const payload = {userId, email}
        const secret = this.configService.get('ACCESS_TOKEN_KEY')
        const access_token = this.jwtService.sign(payload, {expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'), secret})
        return access_token
    }

    async signRefreshToken(userId: number, email: string): Promise<string>{
        const payload = {userId, email}
        const secret = this.configService.get('REFRESH_TOKEN_KEY')
        const refresh_token = this.jwtService.sign(payload, {expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'), secret})
        return refresh_token
    }
}
