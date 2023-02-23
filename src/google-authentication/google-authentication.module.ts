import { Module } from "@nestjs/common";
import { GoogleAuthenticationService } from "./google-authentication.service";
import { GoogleAuthenticationController } from "./google-authentication.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService],
  exports: [GoogleAuthenticationService],
})
export class GoogleAuthenticationModule {}
