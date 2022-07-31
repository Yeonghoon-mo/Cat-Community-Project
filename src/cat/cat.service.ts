import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRepository } from './cat.repository';
import { CatRequestDTO } from './dto/cat.request.dto';

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}

  async signUp(body: CatRequestDTO) {
    const { email, name, password } = body;

    // * Email 중복체크
    const isCatExist = await this.catRepository.existsByEmail(email);
    if (isCatExist) {
      throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
    }

    // * Password Encoding
    const hashedPassword = await bcrypt.hash(password, 10);

    // * Create
    const cat = await this.catRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
