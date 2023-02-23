"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const postgresErrorCode_enum_1 = require("../database/postgresErrorCode.enum");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const accessToken = await this.signAccessToken(user.id, user.email);
        const refreshToken = await this.signRefreshToken(user.id, user.email);
        await this.userService.setCurrentRefreshToken(refreshToken, user.id);
        return { accessToken, refreshToken };
    }
    async register(registerForm) {
        const hashPassword = await argon.hash(registerForm.password);
        try {
            const createdUser = await this.userService.create(Object.assign(Object.assign({}, registerForm), { hashPassword: hashPassword }));
            return createdUser;
        }
        catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.code) === postgresErrorCode_enum_1.default.UniqueViolation) {
                throw new common_1.HttpException("User with that email already exists", common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException("Something went wrong", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAuthenticatedUser(email, plainTextPassword) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.userService.verifyPassword(plainTextPassword, user.hashPassword);
            return user;
        }
        catch (err) {
            throw new common_1.HttpException("Wrong email/password", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refreshAccessToken(user, refreshToken) {
        const foundUser = await this.userService.getById(user.id);
        await this.userService.verifyRefreshToken(foundUser.currentHashedRefreshToken, refreshToken);
        const accessToken = await this.signAccessToken(user.id, user.email);
        return { accessToken };
    }
    async signAccessToken(userId, email) {
        const payload = { userId, email };
        const secret = this.configService.get("ACCESS_TOKEN_KEY");
        const access_token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get("JWT_ACCESS_EXPIRATION_TIME"),
            secret,
        });
        return access_token;
    }
    async signRefreshToken(userId, email) {
        const payload = { userId, email };
        const secret = this.configService.get("REFRESH_TOKEN_KEY");
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get("JWT_REFRESH_EXPIRATION_TIME"),
            secret,
        });
        return refresh_token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map