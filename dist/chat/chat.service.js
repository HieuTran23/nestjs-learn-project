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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const auth_service_1 = require("../auth/auth.service");
let ChatService = class ChatService {
    constructor(authService) {
        this.authService = authService;
    }
    async getUserFormSocket(socket) {
        const access_token = socket.handshake.headers.authorization;
        const user = await this.authService.getUserFormAuthToken(access_token);
        if (!user)
            throw new websockets_1.WsException("Invalid credentials");
        return user;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map