import { Server, Socket } from "socket.io";
import { ChatService } from "src/chat/chat.service";
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(socket: Socket): Promise<void>;
    listenForMessage(content: string, socket: Socket): Promise<void>;
}
