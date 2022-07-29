import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ErrorInterceptor } from './Shared/interceptors/Error.interceptor';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Coffebreak API')
    .setDescription('API for Coffebreak: science podcast')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // set api prefix
  app.setGlobalPrefix('api');

  // global interceptors
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(process.env.PORT ?? 3000);

  logger.log('Application is running on: ' + process.env.PORT ?? 3000);
}
bootstrap();
