import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // set api prefix
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);

  logger.log('Application is running on: ' + process.env.PORT ?? 3000);
}
bootstrap();
