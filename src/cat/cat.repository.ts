import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CatRequestDTO } from './dto/cat.request.dto';

@Injectable()
export class CatRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // 모든 고양이 조회
  async findAll() {
    return await this.catModel.find();
  }

  // Email 중복체크
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) {
      return true
    } else {
      return false;
    }
  }

  // ID로 ID로 Cat(User) 찾기.
  async findCatByIdWithOutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password'); // 패스워드를 가지고 오지 않는다는 문법. ( select( -password) )
    return cat;
  }

  // Create
  async create(cat: CatRequestDTO): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  // Login
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  // 파일 업로드
  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8080/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }
}
