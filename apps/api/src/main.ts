import { NestFactory } from '@nestjs/core';
import { MainModule } from '@/main.module';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const APP_NAME = 'API';
const HTTP_PORT = 8080;

async function bootstrap() {
  const app = (
    await NestFactory.create<NestExpressApplication>(MainModule, {
      logger: new ConsoleLogger(APP_NAME, {
        timestamp: true,
        logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
      }),
    })
  ).setGlobalPrefix('api');

  app.disable('x-powered-by');

  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, documentBuilder, documentOptions);
  Object.values((document as OpenAPIObject).paths).forEach((path) => {
    Object.values(path).forEach((method) => {
      if (Array.isArray(method.security) && method.security.includes('isPublic')) {
        method.security = [];
      } else {
        method.security = [{ bearer: [] }];
      }
    });
  });

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(HTTP_PORT);
}

bootstrap();
