import { Controller, Get } from "@nestjs/common";
import { GoogleAuthenticationService } from "./google-authentication.service";

@Controller("google-authentication")
export class GoogleAuthenticationController {
  constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

  @Get()
  async getGoogleAccessToken() {
    const accessToken = await this.googleAuthenticationService.getAccessToken();
    return accessToken;
  }
}
