import { ApiProperty } from "@nestjs/swagger";
import { ProductVariant as PrismaProductVariant } from "@prisma/client";

export class ProductVariant implements PrismaProductVariant {
  @ApiProperty()
  mProductId: number;
  @ApiProperty()
  mSku: string;
  @ApiProperty()
  mVariantValue: number;
  @ApiProperty()
  mPrice: number;
  @ApiProperty()
  mVariantType: string;
  @ApiProperty()
  mStock: number;
}