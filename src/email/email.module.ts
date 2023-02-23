import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { ConfigModule } from "@nestjs/config";
import { GoogleAuthenticationModule } from "src/google-authentication/google-authentication.module";

@Module({
  imports: [ConfigModule, GoogleAuthenticationModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
