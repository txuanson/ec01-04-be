import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
  @IsString()
  mStatus?: string
}
