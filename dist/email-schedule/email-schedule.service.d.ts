import { SchedulerRegistry } from "@nestjs/schedule";
import { EmailService } from "src/email/email.service";
import { EmailScheduleDto } from "./dto/email-schedule.dto";
export declare class EmailScheduleService {
    private readonly emailService;
    private readonly schedulerRegistry;
    constructor(emailService: EmailService, schedulerRegistry: SchedulerRegistry);
    scheduleEmail(emailSchedule: EmailScheduleDto): Promise<void>;
    cancelAllScheduledEmails(): void;
}
