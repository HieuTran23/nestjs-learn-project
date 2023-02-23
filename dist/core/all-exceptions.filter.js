"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const fs = require("fs");
let AllExceptionFilter = class AllExceptionFilter {
    constructor() {
        this.logError = (errorLog) => {
            console.log("-=-=-=-=-=-=-=-=-=- Start Error Logger -=-=-=-=-=-=-=-=-=-");
            console.log(errorLog);
            console.log("-=-=-=-=-=-=-=-=-=- End Error Logger -=-=-=-=-=-=-=-=-=-\n\n");
        };
        this.getErrorResponse = (status, errorMessage, request) => ({
            statusCode: status,
            error: errorMessage,
            path: request.url,
            method: request.method,
            timeStamp: new Date(),
        });
        this.getErrorLog = (errorResponse, request, exception) => {
            var _a;
            const { statusCode, error } = errorResponse;
            const { method, url } = request;
            const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url} \n${JSON.stringify(errorResponse)} \nUser: ${JSON.stringify((_a = request.user) !== null && _a !== void 0 ? _a : "Not signed in")} \n${exception instanceof exceptions_1.HttpException ? exception.stack : error}\n\n`;
            return errorLog;
        };
        this.writeErrorLogToFile = (errorLog) => {
            fs.appendFile("error.log", errorLog, "utf8", (err) => {
                if (err)
                    throw err;
            });
        };
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let errorMessage;
        if (exception instanceof exceptions_1.HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage =
                errorResponse.error || exception.message;
        }
        else {
            console.log(exception);
            status = enums_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = "Critical internal server error occurred!";
        }
        const errorResponse = this.getErrorResponse(status, errorMessage, request);
        const errorLog = this.getErrorLog(errorResponse, request, exception);
        this.writeErrorLogToFile(errorLog);
        this.logError(errorLog);
        response.status(status).json(errorResponse);
    }
};
AllExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exceptions.filter.js.map