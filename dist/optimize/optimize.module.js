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
const optimize_service_1 = require("./optimize.service");
const optimize_controller_1 = require("./optimize.controller");
const bull_1 = require("@nestjs/bull");
let OptimizeModule = class OptimizeModule {
};
OptimizeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: "image",
            }),
        ],
        controllers: [optimize_controller_1.OptimizeController],
        providers: [optimize_service_1.OptimizeService],
    })
], OptimizeModule);
exports.OptimizeModule = OptimizeModule;
//# sourceMappingURL=optimize.module.js.map