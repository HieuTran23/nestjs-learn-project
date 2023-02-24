"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const post_module_1 = require("./post/post.module");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const Joi = require("@hapi/joi");
const all_exceptions_filter_1 = require("./core/all-exceptions.filter");
const core_1 = require("@nestjs/core");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const icons_module_1 = require("./icons/icons.module");
const logging_interceptor_1 = require("./core/logging.interceptor");
const transform_interceptor_1 = require("./core/transform.interceptor");
const email_module_1 = require("./email/email.module");
const schedule_1 = require("@nestjs/schedule");
const email_schedule_module_1 = require("./email-schedule/email-schedule.module");
const google_authentication_module_1 = require("./google-authentication/google-authentication.module");
const bull_1 = require("@nestjs/bull");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    PORT: Joi.number().required(),
                    ACCESS_TOKEN_KEY: Joi.string().required(),
                    REFRESH_TOKEN_KEY: Joi.string().required(),
                    JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
                    JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
                    EMAIL_SERVICE: Joi.string().required(),
                    EMAIL_USER: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                    GOOGLE_CLIENT_ID: Joi.string().required(),
                    GOOGLE_CLIENT_SECRET: Joi.string().required(),
                    GOOGLE_REDIRECT_URI: Joi.string().required(),
                    GOOGLE_REFRESH_TOKEN: Joi.string().required(),
                    REDIS_HOST: Joi.string().required(),
                    REDIS_PORT: Joi.number().required(),
                }),
            }),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    redis: {
                        host: configService.get("REDIS_HOST"),
                        port: Number(configService.get("REDIS_PORT")),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            post_module_1.PostModule,
            icons_module_1.IconsModule,
            email_module_1.EmailModule,
            schedule_1.ScheduleModule.forRoot(),
            email_schedule_module_1.EmailScheduleModule,
            google_authentication_module_1.GoogleAuthenticationModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map