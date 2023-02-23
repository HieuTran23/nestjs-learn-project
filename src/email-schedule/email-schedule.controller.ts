import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EmailScheduleService } from "./email-schedule.service";
import JwtAuthenticationGuard from "src/auth/guard/jwt-authentication.guard";
import { EmailScheduleDto } from "./dto/email-schedule.dto";

@Controller("email-schedule")
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  @Post("schedule")
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    try {
      this.emailScheduleService.scheduleEmail(emailSchedule);
    } catch (err) {
      console.log(err);
    }
  }
}
