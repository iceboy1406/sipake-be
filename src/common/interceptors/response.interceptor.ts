import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const customMessage = this.reflector.get<string>(
      'responseMessage',
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => ({
        statusCode: 200,
        message: customMessage || 'Request successful',
        data,
      })),
    );
  }
}
