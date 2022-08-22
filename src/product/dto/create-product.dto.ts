import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../constant/product-status.constant";

export class CreateProductDto {
  @ApiProperty()
  mName: string;
  @ApiProperty()
  mDesc: string;
  @ApiProperty()
  mManuId?: number;
  @ApiProperty()
  mPhotos: string[];
  @ApiProperty()
  mCategoryId?: number;
  @ApiProperty()
  mOriginId?: number;
  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatus)
  mStatus?: ProductStatus = ProductStatus.HIDDEN;
}
