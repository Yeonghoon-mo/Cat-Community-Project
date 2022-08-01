import { CatRepository } from './../../cat/cat.repository';
import { CommentCreateDto } from './../dto/comments.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catRepository: CatRepository,
  ) {}
  
  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComments(id: string, commentData: CommentCreateDto) {
    try {
      const targetCat = await this.catRepository.findCatByIdWithOutPassword(id);
      const { contents, author } = commentData;
      const validatedAuthor =
        await this.catRepository.findCatByIdWithOutPassword(author);
      const newComment = new this.commentsModel({ author: validatedAuthor._id, contents, info: targetCat._id });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      
    }
  }
}
