import { CatsModule } from './../cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';
import { Comments, CommentSchema } from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentSchema }]),
    CatsModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
