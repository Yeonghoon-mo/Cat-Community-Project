import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

//* CustomPipe
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  // * 이 함수에서의 결과값이 Pipe의 결과값이 되는 것.
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value;
  }
}
