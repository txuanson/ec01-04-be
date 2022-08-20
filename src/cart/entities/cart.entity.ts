import { ApiProperty } from "@nestjs/swagger";
import { ShoppingSession as PrismaShoppingSession } from "@prisma/client"

export class ShoppingSession implements PrismaShoppingSession {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mUserId: number;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
}
