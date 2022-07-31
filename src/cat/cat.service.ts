import { CatDTO } from './dto/cat.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatDTO) {
    const { email, name, password } = body;

    // * Email 중복체크
    const isCatExist = await this.catModel.exists({ email });
    if (isCatExist) {
      throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
    }

    // * Password Encoding
    const hashedPassword = await bcrypt.hash(password, 10);

    // * Create
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
