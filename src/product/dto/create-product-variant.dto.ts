import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class  CreateProductVariantDto {
  @ApiProperty()
  mSku: string;
  @ApiProperty()
  mVariantValue: string;
  @ApiProperty()
  mPrice: number;
  @ApiProperty()
  mVariantType: string;
  @ApiProperty()
  mStock: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  mStatus?: string
}
