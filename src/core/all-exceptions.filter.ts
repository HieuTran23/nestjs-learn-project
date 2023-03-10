import { Catch, ExceptionFilter } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { ArgumentsHost } from "@nestjs/common/interfaces";
import { Response, Request } from "express";
import * as fs from "fs";
import { HttpExceptionResponse } from "./interface/http-exception-response.interface";
import { CustomHttpExceptionResponse } from "./interface/custom-http-exception-reponse.interface";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      console.log(exception);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = "Critical internal server error occurred!";
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);
    this.logError(errorLog);
    response.status(status).json(errorResponse);
  }

  private logError = (errorLog: string) => {
    console.log("-=-=-=-=-=-=-=-=-=- Start Error Logger -=-=-=-=-=-=-=-=-=-");
    console.log(errorLog);
    console.log("-=-=-=-=-=-=-=-=-=- End Error Logger -=-=-=-=-=-=-=-=-=-\n\n");
  };

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown
  ): string => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url} \n${JSON.stringify(
      errorResponse
    )} \nUser: ${JSON.stringify(request.user ?? "Not signed in")} \n${
      exception instanceof HttpException ? exception.stack : error
    }\n\n`;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile("error.log", errorLog, "utf8", (err) => {
      if (err) throw err;
    });
  };
}
