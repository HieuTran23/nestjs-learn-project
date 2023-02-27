import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}

  async getUserFormSocket(socket: Socket) {
    const access_token = socket.handshake.headers.authorization;

    const user = await this.authService.getUserFormAuthToken(access_token);

    if (!user) throw new WsException("Invalid credentials");

    return user;
  }
}
