import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

// * 스키마에 대한 옵션 ( DB에서 데이터가 만들어지면 현재 시간 timestamp가 생성이 된다.)
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({ description: '작성한 고양이 ID', required: true })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({ description: '댓글 Content', required: true })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  contents: string;

  @ApiProperty({ description: '좋아요 수' })
  @Prop({ default: 0 })
  @IsPositive() // 음수가 될수없는 Number
  likeCount: number;

  @ApiProperty({ description: '작성 대상(게시물, 정보글)', required: true })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
