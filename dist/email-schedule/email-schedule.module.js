"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const email_schedule_service_1 = require("./email-schedule.service");
const email_schedule_controller_1 = require("./email-schedule.controller");
const email_module_1 = require("../email/email.module");
let EmailScheduleModule = class EmailScheduleModule {
};
EmailScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule],
        controllers: [email_schedule_controller_1.EmailScheduleController],
        providers: [email_schedule_service_1.EmailScheduleService],
    })
], EmailScheduleModule);
exports.EmailScheduleModule = EmailScheduleModule;
//# sourceMappingURL=email-schedule.module.js.map