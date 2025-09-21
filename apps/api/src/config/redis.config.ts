import { Redis } from '@upstash/redis';
import { ConfigService } from '@nestjs/config';

export const createRedisClient = (configService: ConfigService): Redis => {
  return new Redis({
    url: configService.get<string>('UPSTASH_REDIS_REST_URL'),
    token: configService.get<string>('UPSTASH_REDIS_REST_TOKEN'),
  });
};
