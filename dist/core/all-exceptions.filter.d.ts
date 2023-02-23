import { ExceptionFilter } from "@nestjs/common";
import { ArgumentsHost } from "@nestjs/common/interfaces";
export declare class AllExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
    private logError;
    private getErrorResponse;
    private getErrorLog;
    private writeErrorLogToFile;
}
