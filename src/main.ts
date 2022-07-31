import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * Global Filter.
  app.useGlobalFilters(new HttpExceptionFilter());
  // * ClassValidation을 사용할 수 있는 GlobalPipe.
  app.useGlobalPipes(new ValidationPipe());

  // * Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('Cat Api description')
    .setVersion('1.0.0')
    .addTag('cat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true
  });

  // * Port Setting
  await app.listen(process.env.PORT);
}
bootstrap();
