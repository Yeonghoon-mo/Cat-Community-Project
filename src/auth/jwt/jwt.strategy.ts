import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "./jwt.payload";
import { CatRepository } from "../../cat/cat.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catRepository: CatRepository) {
    // JWT에 대한 설정
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // AuthHeader에 BearToken이 있다.
      secretOrKey: 'secret',
      ignoreExpiration: false, // 만료 기간
    });
  }

  async validate(payload: Payload) {
    // ID로 Cat(User)을 찾는다. ID는 payload.sub에 저장이 되어있다.
    const cat = await this.catRepository.findCatByIdWithOutPassword(payload.sub);
    if(cat) {
      return cat; // Request.user 안에 Cat이 들어가게 된다.
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}