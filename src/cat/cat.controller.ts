import { CatRequest } from './dto/cat.request';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly CatService: CatService) {}

  @Get()
  findOne() {
    return '';
  }

  @Post()
  async signUp(@Body() body: CatRequest) {
    return await this.CatService.signUp(body);
  }

  @Post('/login')
  login() {
    return '';
  }

  @Post('/logout')
  logout() {
    return '';
  }
}
