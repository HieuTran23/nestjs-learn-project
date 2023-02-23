import { EmailScheduleService } from "./email-schedule.service";
import { EmailScheduleDto } from "./dto/email-schedule.dto";
import { IntervalScheduleEmail } from "./dto/interval-email-schedule.dto";
export declare class EmailScheduleController {
    private readonly emailScheduleService;
    constructor(emailScheduleService: EmailScheduleService);
    scheduleEmail(emailSchedule: EmailScheduleDto): void;
    intervalScheduleEmail(intervalEmailSchedule: IntervalScheduleEmail): Promise<void>;
    deleteIntervalScheduleEmail(name: string): Promise<void>;
}
