import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
export declare class ChatService {
    private readonly authService;
    constructor(authService: AuthService);
    getUserFormSocket(socket: Socket): Promise<import("../user/entities/user.entity").default>;
}
