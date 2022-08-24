import { ApiProperty } from "@nestjs/swagger";
import { Category as PrismaCategory } from "@prisma/client";
import { Exclude } from "class-transformer";

export class Category implements PrismaCategory {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mName: string;
  @ApiProperty()
  mSlug: string;
  @ApiProperty()
  mDesc: string;
  @ApiProperty()
  mDepth: number;
  @ApiProperty()
  mCreateAt: Date;
  @ApiProperty()
  mModifiedAt: Date;
  @ApiProperty()
  mParent: number;

  @Exclude()
  mRightNode: number;
  @Exclude()
  mLeftNode: number;
}
