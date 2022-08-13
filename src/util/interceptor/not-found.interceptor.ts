import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}