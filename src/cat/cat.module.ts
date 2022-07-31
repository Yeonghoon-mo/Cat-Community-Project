import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { Cat, CatSchema } from './cat.schema';
import { CatService } from './cat.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatController, CatRepository],
  providers: [CatService],
})
export class CatsModule {}
