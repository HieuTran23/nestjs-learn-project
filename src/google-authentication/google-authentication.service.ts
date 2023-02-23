import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class GoogleAuthenticationService {
  oAuth2Client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const oAuth2Client = new google.auth.OAuth2(
      this.configService.get("GOOGLE_CLIENT_ID"),
      this.configService.get("GOOGLE_CLIENT_SECRET"),
      this.configService.get("GOOGLE_REDIRECT_URI")
    );
    oAuth2Client.setCredentials({
      refresh_token: this.configService.get("GOOGLE_REFRESH_TOKEN"),
    });

    this.oAuth2Client = oAuth2Client;
  }

  async getAccessToken() {
    return await this.oAuth2Client.getAccessToken();
  }
}
