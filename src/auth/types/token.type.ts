import { ApiProperty } from "@nestjs/swagger";

export class Token {
  @ApiProperty()
  accessToken: string
}