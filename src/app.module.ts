import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as Joi from '@hapi/joi';
import { AllExceptionFilter } from './core/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RatesModule } from './rates/rates.module';
import { IconsModule } from './icons/icons.module';

@Module({
  imports: [ConfigModule.forRoot({
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
    }),
  }),
  DatabaseModule,
  AuthModule,
  UserModule,
  CategoryModule,
  ProductModule,
  PostModule,
  RatesModule,
  IconsModule,],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionFilter
  }],
})
export class AppModule {}
