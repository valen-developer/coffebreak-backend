import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as requestIp from 'request-ip';
import { Observable, tap } from 'rxjs';

const requestLogger = new Logger('RequestLogger');
const responseLogger = new Logger('ResponseLogger');

export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    const ip = requestIp.getClientIp(req);
    const method = req.method;
    const url = req.originalUrl;

    requestLogger.log(`${ip} ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res?.statusCode;

        responseLogger.log(`${ip} ${method} ${url} ${statusCode}`);
      }),
    );
  }
}
