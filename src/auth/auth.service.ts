import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CatRepository } from "../cat/cat.repository";
import { LoginRequestDto } from "./dto/login.request.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly catRepository: CatRepository, private jwtService: JwtService) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    // 해당하는 Email이 있는지
    const cat = await this.catRepository.findCatByEmail(email);
    // Password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password);
    if(!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
