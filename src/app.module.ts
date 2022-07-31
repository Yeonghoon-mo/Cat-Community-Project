import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CatsModule } from 'src/cat/cat.module';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev';

  configure(consumer: MiddlewareConsumer) {
    //* 전체 엔드포인트에 LoggerMiddleware가 실행이 된다.
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // * DB 쿼리를 Log로 출력.
    mongoose.set('debug', this.isDev);
  }
}
