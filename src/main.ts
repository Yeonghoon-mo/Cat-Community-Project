import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exception/http-exception.filter";
import * as expressBasicAuth from "express-basic-auth";
import * as path from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 파일 업로드를 위해 제네릭 타입 선언(NestExpressApplication)
  // * ClassValidation을 사용할 수 있는 GlobalPipe.
  app.useGlobalPipes(new ValidationPipe({ transform : true }));
  // * Global Filter.
  app.useGlobalFilters(new HttpExceptionFilter());
  // Swagger 보안설정
  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // 파일 접근을 위한 미들웨어. ex) http://localhost:3000/media/cat/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'upload'), {
    prefix: '/media',
  });

  // * Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('Cat Api description')
    .setVersion('1.0.0')
    .addTag('cat')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true
  });
  // * Port Setting
  await app.listen(process.env.PORT);
}
bootstrap();
