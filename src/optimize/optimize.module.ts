import { Module } from "@nestjs/common";
import { OptimizeController } from "./optimize.controller";
import { BullModule } from "@nestjs/bull";
import { MessageOptimizeService } from "./services/message-optimize.service";
import { MessageConsumer } from "./consumers/message.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "message-queue",
    }),
    BullModule.registerQueue({
      name: "file-operation-queue",
    }),
  ],
  controllers: [OptimizeController],
  providers: [MessageOptimizeService, MessageConsumer],
})
export class OptimizeModule {}
