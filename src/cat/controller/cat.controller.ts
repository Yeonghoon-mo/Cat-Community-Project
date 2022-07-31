import { CatResponseDTO } from "../dto/cat.response.dto";
import { CatRequestDTO } from "../dto/cat.request.dto";
import { Body, Controller, Get, Post, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { CatService } from "../service/cat.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "../../auth/auth.service";
import { LoginRequestDto } from "../../auth/dto/login.request.dto";
import { JwtAuthGuard } from "../../auth/jwt/jwt.guard";
import { CurrentUser } from "../../common/decorator/user.decorator";
import { HttpExceptionFilter } from "../../common/exception/http-exception.filter";
import { SuccessInterceptor } from "../../common/interceptor/success.interceptor";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../../common/util/multer.options";
import { Cat } from "../cat.schema";

@Controller('cat')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatController {
  constructor(private readonly CatService: CatService,
              private readonly authService: AuthService) {}

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.CatService.getAllCat();
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) { // Custom Decorator
    return cat.readOnlyData;
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

  // 로그아웃 Api는 필요없다. 이유는 JWT자체를 프론트에서 제거를 하면 로그아웃이 되는거다.
  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  // 단일 파일(이미지) 업로드
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cat')))
  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
    console.log(files);

    // return { image: `http://localhost:8000/media/cat/${files[0].filename}`} // 단일 파일 업로드
    return this.CatService.uploadImg(cat, files);
  }
}
