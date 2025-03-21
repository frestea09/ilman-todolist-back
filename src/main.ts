import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { VersioningType } from '@nestjs/common';
import { ResponseInterceptor } from './response/response.interceptor';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });
  app.use(compression());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
