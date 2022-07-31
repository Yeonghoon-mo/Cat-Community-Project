import { PickType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

export class CatRequestDTO extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
