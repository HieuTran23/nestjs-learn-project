import { Module } from "@nestjs/common";
import { PostModule } from "./post/post.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import * as Joi from "@hapi/joi";
import { AllExceptionFilter } from "./core/all-exceptions.filter";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { IconsModule } from "./icons/icons.module";
import { LoggingInterceptor } from "./core/logging.interceptor";
import { TransformInterceptor } from "./core/transform.interceptor";
import { EmailModule } from "./email/email.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EmailScheduleModule } from "./email-schedule/email-schedule.module";
import { GoogleAuthenticationModule } from './google-authentication/google-authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        ACCESS_TOKEN_KEY: Joi.string(),
        REFRESH_TOKEN_KEY: Joi.string(),
        JWT_ACCESS_EXPIRATION_TIME: Joi.string(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string(),
        EMAIL_SERVICE: Joi.string(),
        EMAIL_USER: Joi.string(),
        EMAIL_PASSWORD: Joi.string(),
        GOOGLE_CLIENT_ID: Joi.string(),
        GOOGLE_CLIENT_SECRET: Joi.string(),
        GOOGLE_REDIRECT_URI: Joi.string(),
        GOOGLE_REFRESH_TOKEN: Joi.string(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    PostModule,
    IconsModule,
    EmailModule,
    ScheduleModule.forRoot(),
    EmailScheduleModule,
    GoogleAuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
