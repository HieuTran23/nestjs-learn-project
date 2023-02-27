import { Controller, Get, Query } from "@nestjs/common";
import { MessageOptimizeService } from "./services/message-optimize.service";

@Controller("optimize")
export class OptimizeController {
  constructor(private readonly messageOptimizeService: MessageOptimizeService) {}

  @Get("msg-optimize")
  getInvokeMsg(@Query("msg") msg: string) {
    this.messageOptimizeService.sendMessage(msg);
    return msg;
  }
}
