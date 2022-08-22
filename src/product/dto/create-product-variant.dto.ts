import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../constant/product-status.constant";

export class CreateProductVariantDto {
  @ApiProperty()
  mSku: string;
  @ApiProperty()
  mVariantValue: string;
  @ApiProperty()
  mPrice: number;
  @ApiProperty()
  mVariantType: string;
  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus)
  mStatus?: ProductStatus = ProductStatus.HIDDEN;
}
