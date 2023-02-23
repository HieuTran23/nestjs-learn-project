import { EmailScheduleService } from "./email-schedule.service";
import { EmailScheduleDto } from "./dto/email-schedule.dto";
export declare class EmailScheduleController {
    private readonly emailScheduleService;
    constructor(emailScheduleService: EmailScheduleService);
    scheduleEmail(emailSchedule: EmailScheduleDto): Promise<void>;
}
