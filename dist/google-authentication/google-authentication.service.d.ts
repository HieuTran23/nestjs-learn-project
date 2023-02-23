import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
export declare class GoogleAuthenticationService {
    private readonly configService;
    oAuth2Client: OAuth2Client;
    constructor(configService: ConfigService);
    getAccessToken(): Promise<import("google-auth-library/build/src/auth/oauth2client").GetAccessTokenResponse>;
}
