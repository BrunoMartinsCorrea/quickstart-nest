import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ErrorFilter } from './common/filter/error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const APP_NAME = 'API';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(APP_NAME, {
      timestamp: true,
      logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
    }),
  });

  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/docs', app, document);

  await app.setGlobalPrefix('api').useGlobalFilters(new ErrorFilter()).listen(8080);
}

bootstrap();
