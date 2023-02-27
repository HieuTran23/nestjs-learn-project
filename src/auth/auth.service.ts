import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import RegisterDto from "./dto/register.dto";
import * as argon from "argon2";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import User from "src/user/entities/user.entity";
import LoginDto from "./dto/login.dto";
import TokenPayload from "./interface/tokenPayload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.signAccessToken(user.id, user.email);
    const refreshToken = await this.signRefreshToken(user.id, user.email);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    return { accessToken, refreshToken };
  }

  async register(registerForm: RegisterDto): Promise<User> {
    const hashPassword = await argon.hash(registerForm.password);
    try {
      const createdUser = await this.userService.create({
        ...registerForm,
        hashPassword: hashPassword,
      });
      return createdUser;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.userService.verifyPassword(plainTextPassword, user.hashPassword);
      return user;
    } catch (err) {
      throw new HttpException("Wrong email/password", HttpStatus.BAD_REQUEST);
    }
  }

  async refreshAccessToken(user: User, refreshToken: string): Promise<{ accessToken: string }> {
    const foundUser = await this.userService.getById(user.id);

    await this.userService.verifyRefreshToken(foundUser.currentHashedRefreshToken, refreshToken);

    const accessToken = await this.signAccessToken(user.id, user.email);
    return { accessToken };
  }

  async signAccessToken(userId: number, email: string): Promise<string> {
    const payload = { userId, email };
    const secret = this.configService.get("ACCESS_TOKEN_KEY");
    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_ACCESS_EXPIRATION_TIME"),
      secret,
    });
    return access_token;
  }

  async signRefreshToken(userId: number, email: string): Promise<string> {
    const payload = { userId, email };
    const secret = this.configService.get("REFRESH_TOKEN_KEY");
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_REFRESH_EXPIRATION_TIME"),
      secret,
    });
    return refresh_token;
  }

  async getUserFormAuthToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get("ACCESS_TOKEN_KEY"),
    });
    if (payload.userId) {
      const user = await this.userService.getById(payload.userId);
      return user;
    }
  }
}
