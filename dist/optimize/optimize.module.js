"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeModule = void 0;
const common_1 = require("@nestjs/common");
const optimize_controller_1 = require("./optimize.controller");
const bull_1 = require("@nestjs/bull");
const message_optimize_service_1 = require("./services/message-optimize.service");
const message_consumer_1 = require("./consumers/message.consumer");
let OptimizeModule = class OptimizeModule {
};
OptimizeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: "message-queue",
            }),
            bull_1.BullModule.registerQueue({
                name: "file-operation-queue",
            }),
        ],
        controllers: [optimize_controller_1.OptimizeController],
        providers: [message_optimize_service_1.MessageOptimizeService, message_consumer_1.MessageConsumer],
    })
], OptimizeModule);
exports.OptimizeModule = OptimizeModule;
//# sourceMappingURL=optimize.module.js.map