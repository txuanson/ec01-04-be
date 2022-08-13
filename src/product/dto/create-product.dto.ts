import { ApiProperty } from "@nestjs/swagger";

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
}
