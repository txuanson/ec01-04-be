import { ApiProperty } from "@nestjs/swagger";
import { Manufacturer as PrismaManufacturer } from "@prisma/client";

export class Manufacturer implements PrismaManufacturer {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mName: string;
  @ApiProperty()
  mSlug: string;
  @ApiProperty()
  mDesc: string;
  @ApiProperty()
  mLogo: string;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
}
