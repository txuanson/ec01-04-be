import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  NotFoundException,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            console.log(error);
            throw new BadRequestException('Unique constraint failed!')
          }
        }
        throw error;
      }),
    );
  }
}