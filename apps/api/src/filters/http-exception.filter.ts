import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
  details?: any;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: ErrorResponse = {
      success: false,
      message: exception.message || 'Internal server error',
      error: exception.name || 'HttpException',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Add validation error details if available
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as any;
      if (responseObj.message && Array.isArray(responseObj.message)) {
        errorResponse.details = responseObj.message;
        errorResponse.message = 'Validation failed';
      }
    }

    response.status(status).json(errorResponse);
  }
}
