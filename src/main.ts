import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * Global Filter.
  app.useGlobalFilters(new HttpExceptionFilter());
  // * ClassValidation을 사용할 수 있는 GlobalPipe.
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
