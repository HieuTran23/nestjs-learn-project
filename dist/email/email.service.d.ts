import { ConfigService } from "@nestjs/config";
import * as Mail from "nodemailer/lib/mailer";
import { GoogleAuthenticationService } from "src/google-authentication/google-authentication.service";
export declare class EmailService {
    private readonly configService;
    private readonly googleAuthenticationService;
    private nodemailerTransport;
    constructor(configService: ConfigService, googleAuthenticationService: GoogleAuthenticationService);
    sendMail(options: Mail.options): Promise<any>;
}
