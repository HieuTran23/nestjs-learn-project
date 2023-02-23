import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import { GoogleAuthenticationService } from "src/google-authentication/google-authentication.service";

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly googleAuthenticationService: GoogleAuthenticationService
  ) {}

  async sendMail(options: Mail.options) {
    const accessToken = await this.googleAuthenticationService.getAccessToken();

    this.nodemailerTransport = createTransport({
      service: this.configService.get("EMAIL_SERVICE"),
      auth: {
        type: "OAuth2",
        user: this.configService.get("EMAIL_USER"),
        clientId: this.configService.get("GOOGLE_CLIENT_ID"),
        clientSecret: this.configService.get("GOOGLE_CLIENT_SECRET"),
        refreshToken: this.configService.get("GOOGLE_REFRESH_TOKEN"),
        accessToken: accessToken,
      },
    });

    return this.nodemailerTransport.sendMail(options);
  }
}
