import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../services/metrics.service';
import { Logger } from '@nestjs/common';

/**
 * MetricsInterceptor
 * - Ghi nhận thời gian xử lý request và set header X-Response-Time-ms
 * - Có thể mở rộng để push metrics sang hệ thống giám sát sau này
 */
@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(MetricsInterceptor.name);
  constructor(private readonly metrics: MetricsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startedAt = Date.now();
    const http = context.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest();

    return next.handle().pipe(
      tap(() => {
        const durationMs = Date.now() - startedAt;
        // Gắn header để quan sát nhanh ở client/proxy
        try {
          response.setHeader('X-Response-Time-ms', String(durationMs));
        } catch {}
        // Structured log with requestId if present
        const requestId = (request as any)?.requestId;
        this.logger.log(
          JSON.stringify({
            msg: 'request_timing',
            method: request?.method,
            path: request?.url,
            durationMs,
            requestId,
          }),
        );
        // Ghi nhận thống kê theo route
        try {
          const routeKey = `${request?.method} ${request?.route?.path ?? request?.url}`;
          this.metrics.record(routeKey, durationMs);
        } catch {}
      }),
    );
  }
}
