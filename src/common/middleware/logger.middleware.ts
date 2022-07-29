import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// * Middleware 작성을 하고, app.module에 보내주면 됨.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //* NestJS에서 제공하는 Logging.
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    //* Response가 완료가 되었을 때 실행되는 Logger.
    res.on('finish', () => {
      this.logger.log(
        `${req.ip}, ${req.method}, ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
