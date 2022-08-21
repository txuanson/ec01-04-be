import { ApiProperty } from "@nestjs/swagger";
import { UserAddress as PrismaUserAddress } from "@prisma/client";

export class UserAddress implements PrismaUserAddress {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mUserId: number;
  @ApiProperty()
  mType: string;
  @ApiProperty()
  mPhone: string;
  @ApiProperty()
  mCity: string;
  @ApiProperty()
  mDistrict: string;
  @ApiProperty()
  mWard: string;
  @ApiProperty()
  mAddress: string;
}