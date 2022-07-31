import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CatRequestDTO } from './dto/cat.request.dto';

@Injectable()
export class CatRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // * Email 중복체크
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) {
      return true
    } else {
      return false;
    }
  }

  // * Create
  async create(cat: CatRequestDTO): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
