import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface RouteTimingEvent {
  route: string;
  durationMs: number;
}

export interface RouteTimingStats {
  count: number;
  avgMs: number;
  p95Ms: number;
  p99Ms: number;
}

/**
 * MetricsService
 * - Thu thập thời gian xử lý theo route (rolling window)
 * - Cung cấp summary (count/avg/p95/p99) dạng JSON để tích hợp nhanh
 */
@Injectable()
export class MetricsService {
  private readonly maxSamplesPerRoute = 1000;
  private readonly routeToSamples = new Map<string, number[]>();
  readonly timings$ = new Subject<RouteTimingEvent>();

  constructor() {
    this.timings$.subscribe(({ route, durationMs }) => {
      const arr = this.routeToSamples.get(route) ?? [];
      arr.push(durationMs);
      if (arr.length > this.maxSamplesPerRoute) {
        arr.shift();
      }
      this.routeToSamples.set(route, arr);
    });
  }

  record(route: string, durationMs: number) {
    this.timings$.next({ route, durationMs });
  }

  getSummary(): Record<string, RouteTimingStats> {
    const result: Record<string, RouteTimingStats> = {};
    for (const [route, samples] of this.routeToSamples.entries()) {
      if (samples.length === 0) continue;
      const sorted = [...samples].sort((a, b) => a - b);
      const count = sorted.length;
      const sum = sorted.reduce((s, v) => s + v, 0);
      const avgMs = Math.round((sum / count) * 100) / 100;
      const p = (q: number) =>
        sorted[Math.min(count - 1, Math.floor(q * count) - 1)];
      const p95Ms = p(0.95) ?? sorted[count - 1];
      const p99Ms = p(0.99) ?? sorted[count - 1];
      result[route] = { count, avgMs, p95Ms, p99Ms };
    }
    return result;
  }
}
