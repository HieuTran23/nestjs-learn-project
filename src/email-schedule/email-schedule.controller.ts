import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EmailScheduleService } from "./email-schedule.service";
import JwtAuthenticationGuard from "src/auth/guard/jwt-authentication.guard";
import { EmailScheduleDto } from "./dto/email-schedule.dto";
import { IntervalScheduleEmail } from "./dto/interval-email-schedule.dto";
import { string } from "@hapi/joi";

@Controller("email-schedule")
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  @Post("schedule")
  scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailScheduleService.scheduleEmail(emailSchedule);
  }

  @Post("interval-schedule-email")
  async intervalScheduleEmail(@Body() intervalEmailSchedule: IntervalScheduleEmail) {
    this.emailScheduleService.intervalScheduleEmail(intervalEmailSchedule);
  }

  @Delete("interval-schedule-email/:name")
  async deleteIntervalScheduleEmail(@Param("name") name: string) {
    this.emailScheduleService.deleteIntervalScheduleEmail(name);
  }
}
