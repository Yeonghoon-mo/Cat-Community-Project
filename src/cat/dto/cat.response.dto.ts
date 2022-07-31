import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cat.schema";

// * PickType은 보여주고 싶은 데이터를 지정하는 것을 의미한다.
export class CatResponseDTO extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '12345678',
    description: 'id'
  })
  id: string;
}