import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { CommentSchema } from './../comment/comment.schema';
import { Cat } from './cat.schema';
import { CatRequestDTO } from './dto/cat.request.dto';

@Injectable()
export class CatRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // 모든 고양이 조회
  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentSchema);
    // populate는 다른 document랑 이어줄 수 있는 Method. 2번째 파라미터는 해당하는 스키마
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
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
  async findCatByIdWithOutPassword({ catId }: { catId: string | Types.ObjectId }): Promise<Cat | null> {
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