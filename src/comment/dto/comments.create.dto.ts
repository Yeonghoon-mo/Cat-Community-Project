import { PickType } from '@nestjs/swagger';
import { Comments } from "../comment.schema";

export class CommentCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
