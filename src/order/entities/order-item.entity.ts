import { ApiProperty } from "@nestjs/swagger";
import { OrderItem as PrismaOrderItem } from "@prisma/client";

export class OrderItem implements PrismaOrderItem {
  @ApiProperty()
  mOrderId: number;
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
  @ApiProperty()
  mPrice: number;
}