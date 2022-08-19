import { ApiProperty } from "@nestjs/swagger";
import { CartItem as PrismaCartItem } from "@prisma/client";

export class CartItem implements PrismaCartItem {
  @ApiProperty()
  mSessionId: number;
  @ApiProperty()
  mProductId: number;
  @ApiProperty()
  mQuantity: number;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
  @ApiProperty()
  mSku: string;
}