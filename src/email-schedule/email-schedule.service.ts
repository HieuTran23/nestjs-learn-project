import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { EmailService } from "src/email/email.service";
import { EmailScheduleDto } from "./dto/email-schedule.dto";
import { CronJob } from "cron";
import { IntervalScheduleEmail } from "./dto/interval-email-schedule.dto";

@Injectable()
export class EmailScheduleService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content,
      });
    });

    const intervalName = `${Date.now()}-${emailSchedule.subject}`;

    this.schedulerRegistry.addCronJob(intervalName, job);
    job.start();
  }

  intervalScheduleEmail(intervalScheduleEmail: IntervalScheduleEmail) {
    const milliseconds = intervalScheduleEmail.milliseconds || 1000;

    const interval = setInterval(() => {
      this.emailService.sendMail({
        to: intervalScheduleEmail.recipient,
        subject: intervalScheduleEmail.subject,
        text: intervalScheduleEmail.content,
      });
    }, milliseconds);

    const intervalName = `${Date.now()}-${intervalScheduleEmail.subject}`;

    this.schedulerRegistry.addInterval(intervalName, interval);

    console.log(intervalName);
  }

  deleteIntervalScheduleEmail(intervalName: string) {
    this.schedulerRegistry.deleteInterval(intervalName);
    console.log(`Interval ${intervalName} deleted!`);
  }

  cancelAllScheduledEmails() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop;
    });
  }
}
