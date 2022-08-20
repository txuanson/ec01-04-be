import { ApiProperty } from "@nestjs/swagger";
import { Origin as PrismaOrigin } from "@prisma/client";

export class Origin implements PrismaOrigin {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mCountry: string;
  @ApiProperty()
  mFlag: string;
  @ApiProperty()
  mSlug: string;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
}
