import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from '../dto/comments.create.dto';
import { CommentService } from './../service/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ "summary" : "모든 고양이 프로필에 적힌 댓글 가져오기 "})
  @Get('')
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @ApiOperation({ "summary" : "특정 고양이 프로필에 댓글 남기기" })
  @Post('/:id')
  async createComment(@Param('id') id: string, @Body() body: CommentCreateDto) {
    return this.commentService.createComments(id, body);
  }

  @ApiOperation({ "summary" : "좋아요 수 올리기"})
  @Patch('/:id')
  async plusLike(@Param('id') id: string) {
    return this.commentService.plusLike(id);
  }

}
