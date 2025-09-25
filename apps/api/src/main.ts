import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './logger/winston.config';
import { requestIdMiddleware } from './middlewares/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonOptions),
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global response + metrics interceptors
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new MetricsInterceptor(),
  );

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Enable cookie parser
  app.use(cookieParser());

  // Attach request-id middleware
  app.use(requestIdMiddleware);

  // Security & performance middlewares
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Enable CORS for cookies (configurable)
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigin ? corsOrigin.split(',').map((o) => o.trim()) : true,
    credentials: true,
  });

  // Swagger (optional via ENABLE_SWAGGER=true)
  if (configService.get<string>('ENABLE_SWAGGER') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Fresh Shop API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
