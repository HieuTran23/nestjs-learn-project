import { Module } from "@nestjs/common";
import { EmailScheduleService } from "./email-schedule.service";
import { EmailScheduleController } from "./email-schedule.controller";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [EmailModule],
  controllers: [EmailScheduleController],
  providers: [EmailScheduleService],
})
export class EmailScheduleModule {}
