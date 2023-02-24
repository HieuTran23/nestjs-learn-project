import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Post from "src/post/entities/post.entity";
import User from "src/user/entities/user.entity";
import Category from "src/category/entities/category.entities";
import Product from "src/product/entities/product.entity";
import Icon from "src/icons/entities/icon.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [Product, User, Post, Category, Icon],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
