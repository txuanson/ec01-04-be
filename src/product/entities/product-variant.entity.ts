import { ApiProperty } from "@nestjs/swagger";
import { ProductVariant as PrismaProductVariant } from "@prisma/client";
import { ProductStatus } from "../constant/product-status.constant";

export class ProductVariant implements PrismaProductVariant {
  @ApiProperty()
  mProductId: number;
  @ApiProperty()
  mSku: string;
  @ApiProperty()
  mVariantValue: string;
  @ApiProperty()
  mPrice: number;
  @ApiProperty()
  mVariantType: string;
  @ApiProperty()
  mStatus: ProductStatus;

  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
}