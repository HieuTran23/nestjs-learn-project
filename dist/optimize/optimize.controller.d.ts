import { MessageOptimizeService } from "./services/message-optimize.service";
export declare class OptimizeController {
    private readonly messageOptimizeService;
    constructor(messageOptimizeService: MessageOptimizeService);
    getInvokeMsg(msg: string): string;
}
