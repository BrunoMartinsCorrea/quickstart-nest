import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ErrorFilter } from './common/filter/error.filter';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

const APP_NAME = 'API';

async function bootstrap() {
  const app = (
    await NestFactory.create(AppModule, {
      logger: new ConsoleLogger(APP_NAME, {
        timestamp: true,
        logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
      }),
    })
  )
    .setGlobalPrefix('api')
    .useGlobalFilters(new ErrorFilter());

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

  await app.listen(8080);
}

bootstrap();
