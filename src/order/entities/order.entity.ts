import { ApiProperty } from "@nestjs/swagger";
import { Order as PrismaOrder } from "@prisma/client";

export class Order implements PrismaOrder {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mUserId: number;
  @ApiProperty()
  mStatus: string;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
  @ApiProperty()
  mAddress: string;
  @ApiProperty()
  mPhone: string;
  @ApiProperty()
  mUserName: string;
}
