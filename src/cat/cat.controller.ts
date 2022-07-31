import { CatResponseDTO } from './dto/cat.response.dto';
import { CatRequestDTO } from './dto/cat.request.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cat')
export class CatController {
  constructor(private readonly CatService: CatService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  findOne() {
    return '';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Success !',
    type: CatResponseDTO
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDTO) {
    return await this.CatService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login() {
    return '';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('/logout')
  logout() {
    return '';
  }
}
