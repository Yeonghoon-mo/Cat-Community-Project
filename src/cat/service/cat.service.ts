import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CatRepository } from "../cat.repository";
import { CatRequestDTO } from "../dto/cat.request.dto";
import { Cat } from "../cat.schema";

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}

  // 모든 고양이 조회
  async getAllCat() {
    const allCat = await this.catRepository.findAll();
    return allCat.map((cat) => cat.readOnlyData);
  }

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

  // 파일 업로드
  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cat/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catRepository.findByIdAndUpdateImg(cat.id, fileName);
    console.log(newCat);
    return newCat;
  }
}
