import { ApiProperty } from "@nestjs/swagger";

export class CreateOriginDto {
  @ApiProperty()
  mCountry: string;
  // @ApiProperty()
  // mFlag: string;
}
