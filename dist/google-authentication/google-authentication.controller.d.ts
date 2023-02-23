import { GoogleAuthenticationService } from "./google-authentication.service";
export declare class GoogleAuthenticationController {
    private readonly googleAuthenticationService;
    constructor(googleAuthenticationService: GoogleAuthenticationService);
    getGoogleAccessToken(): Promise<import("google-auth-library/build/src/auth/oauth2client").GetAccessTokenResponse>;
}
