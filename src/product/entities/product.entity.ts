import { ApiProperty } from "@nestjs/swagger";
import { Product as PrismaProduct } from "@prisma/client";

export class Product implements PrismaProduct {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mName: string;
  @ApiProperty()
  mDesc: string;
  @ApiProperty()
  mManuId: number;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
  @ApiProperty()
  mPhotos: string[];
  @ApiProperty()
  mCategoryId: number;
  @ApiProperty()
  mOriginId: number;
  @ApiProperty()
  mRatingCount: number;
  @ApiProperty()
  mAvgRating: number;
  @ApiProperty()
  mStatus: string;
}
