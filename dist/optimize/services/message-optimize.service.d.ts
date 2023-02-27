import { Queue } from "bull";
export declare class MessageOptimizeService {
    private queue;
    constructor(queue: Queue);
    sendMessage(message: string): Promise<void>;
}
