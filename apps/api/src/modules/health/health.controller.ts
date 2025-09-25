import { Controller, Get } from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { MetricsService } from '../../services/metrics.service';

@Controller('health')
export class HealthController {
  constructor(private readonly metrics: MetricsService) {}
  @Public()
  @Get()
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get('metrics')
  metricsSummary() {
    return {
      status: 'ok',
      data: this.metrics.getSummary(),
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get('metrics-prom')
  metricsPrometheus() {
    const summary = this.metrics.getSummary();
    const lines: string[] = [];
    lines.push('# HELP route_count_total Total requests per route');
    lines.push('# TYPE route_count_total counter');
    for (const [route, s] of Object.entries(summary)) {
      lines.push(`route_count_total{route="${route}"} ${s.count}`);
    }
    lines.push('# HELP route_duration_ms_avg Average duration per route (ms)');
    lines.push('# TYPE route_duration_ms_avg gauge');
    for (const [route, s] of Object.entries(summary)) {
      lines.push(`route_duration_ms_avg{route="${route}"} ${s.avgMs}`);
    }
    lines.push('# HELP route_duration_ms_p95 P95 duration per route (ms)');
    lines.push('# TYPE route_duration_ms_p95 gauge');
    for (const [route, s] of Object.entries(summary)) {
      lines.push(`route_duration_ms_p95{route="${route}"} ${s.p95Ms}`);
    }
    lines.push('# HELP route_duration_ms_p99 P99 duration per route (ms)');
    lines.push('# TYPE route_duration_ms_p99 gauge');
    for (const [route, s] of Object.entries(summary)) {
      lines.push(`route_duration_ms_p99{route="${route}"} ${s.p99Ms}`);
    }
    return lines.join('\n');
  }
}
