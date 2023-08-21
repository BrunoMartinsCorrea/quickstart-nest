import { NestFactory } from '@nestjs/core';
import { MainModule } from '@/main.module';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

const APP_NAME = 'API';
const HTTP_PORT = 8080;

async function bootstrap() {
  const app = (
    await NestFactory.create(MainModule, {
      logger: new ConsoleLogger(APP_NAME, {
        timestamp: true,
        logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
      }),
    })
  ).setGlobalPrefix('api');

  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, documentBuilder, documentOptions);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(HTTP_PORT);
}

bootstrap();
