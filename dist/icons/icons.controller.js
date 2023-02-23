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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconsController = void 0;
const common_1 = require("@nestjs/common");
const icons_service_1 = require("./icons.service");
const create_icon_dto_1 = require("./dto/create-icon.dto");
const update_icon_dto_1 = require("./dto/update-icon.dto");
let IconsController = class IconsController {
    constructor(iconsService) {
        this.iconsService = iconsService;
    }
    create(createIconDto) {
        return this.iconsService.create(createIconDto);
    }
    findAll() {
        return this.iconsService.findAll();
    }
    findOne(id) {
        return this.iconsService.findOne(+id);
    }
    update(id, updateIconDto) {
        return this.iconsService.update(+id, updateIconDto);
    }
    remove(id) {
        return this.iconsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_icon_dto_1.CreateIconDto]),
    __metadata("design:returntype", Promise)
], IconsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IconsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IconsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_icon_dto_1.UpdateIconDto]),
    __metadata("design:returntype", Promise)
], IconsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IconsController.prototype, "remove", null);
IconsController = __decorate([
    (0, common_1.Controller)("icon"),
    __metadata("design:paramtypes", [icons_service_1.IconsService])
], IconsController);
exports.IconsController = IconsController;
//# sourceMappingURL=icons.controller.js.map