"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const email_service_1 = require("../email/email.service");
const cron_1 = require("cron");
let EmailScheduleService = class EmailScheduleService {
    constructor(emailService, schedulerRegistry) {
        this.emailService = emailService;
        this.schedulerRegistry = schedulerRegistry;
    }
    scheduleEmail(emailSchedule) {
        const date = new Date(emailSchedule.date);
        const job = new cron_1.CronJob(date, () => {
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
    intervalScheduleEmail(intervalScheduleEmail) {
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
    deleteIntervalScheduleEmail(intervalName) {
        this.schedulerRegistry.deleteInterval(intervalName);
        console.log(`Interval ${intervalName} deleted!`);
    }
    cancelAllScheduledEmails() {
        this.schedulerRegistry.getCronJobs().forEach((job) => {
            job.stop;
        });
    }
};
EmailScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        schedule_1.SchedulerRegistry])
], EmailScheduleService);
exports.EmailScheduleService = EmailScheduleService;
//# sourceMappingURL=email-schedule.service.js.map