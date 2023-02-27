import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "src/chat/chat.service";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFormSocket(socket);
  }

  @SubscribeMessage("send_message")
  async listenForMessage(@MessageBody() content: string, @ConnectedSocket() socket: Socket) {
    const author = await this.chatService.getUserFormSocket(socket);
    this.server.sockets.emit("receive_message", {
      content,
      author,
    });
  }
}
