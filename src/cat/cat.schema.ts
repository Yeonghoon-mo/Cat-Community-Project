import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Comments } from 'src/comment/comment.schema';

// * 스키마에 대한 옵션 ( DB에서 데이터가 만들어지면 현재 시간 timestamp가 생성이 된다.)
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // * Swagger Property
  @ApiProperty({
    example: 'm_lovea@naver.com',
    description: 'email',
    required: true,
  })
  // * DB Setting
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '모영훈',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  }) // default image
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

// * Response Data 암호화
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// * 리스트 형태로 해당하는 데이터를 담기 위해서
_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info', // info의 기준으로 comment를 가져올 것이다 라는 의미. ( ID와 같다 )
});
// 옵션 설정 ( Object, JSON으로 변환이 가능하다 라는 의미. )
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
