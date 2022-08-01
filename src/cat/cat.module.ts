import { Comments, CommentSchema } from './../comment/comment.schema';
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './controller/cat.controller';
import { CatRepository } from './cat.repository';
import { Cat, CatSchema } from './cat.schema';
import { CatService } from './service/cat.service';
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({ dest: './upload' }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }, { name: Comments.name, schema: CommentSchema}]), forwardRef(() => AuthModule)],
  controllers: [CatController],
  providers: [CatService, CatRepository],
  exports: [CatService, CatRepository]
})
export class CatsModule {}
