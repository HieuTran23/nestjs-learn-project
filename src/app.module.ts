import { Module } from "@nestjs/common";
import { PostModule } from "./post/post.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
import { GoogleAuthenticationModule } from "./google-authentication/google-authentication.module";
import { BullModule } from "@nestjs/bull";
import { OptimizeModule } from "./optimize/optimize.module";
import { MessageConsumer } from "./optimize/consumers/message.consumer";
import { ChatModule } from "./chat/chat.module";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [
    ConfigModule.forRoot({
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          port: Number(configService.get("REDIS_PORT")),
        },
      }),
      inject: [ConfigService],
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
    OptimizeModule,
    ChatModule,
    GatewayModule,
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
