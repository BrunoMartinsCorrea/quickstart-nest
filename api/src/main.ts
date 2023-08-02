import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ErrorFilter } from './common/filter/error.filter';

const APP_NAME = 'App';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(APP_NAME, {
      timestamp: true,
      logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
    }),
  });

  await app.setGlobalPrefix('api').useGlobalFilters(new ErrorFilter()).listen(8080);
}

bootstrap();
