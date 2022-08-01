import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorManager } from 'src/helpers/HttpErrorManager';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const { status, message } = new HttpErrorManager().manage(error);

        return throwError(
          () => new HttpException({ ok: false, message }, status),
        );
      }),
    );
  }
}
