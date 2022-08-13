import { ApiProperty } from "@nestjs/swagger";
import { User as PrismaUser } from "@prisma/client";
import { Exclude } from "class-transformer";
export class User implements PrismaUser {
  @ApiProperty()
  mId: number;
  @ApiProperty()
  mName: string;
  @ApiProperty()
  mEmail: string;
  @ApiProperty()
  mCreatedAt: Date;
  @ApiProperty()
  mAvatar: string;
  @ApiProperty()
  mModifiedAt: Date;
  @ApiProperty()
  mLastLogin: Date;

  @Exclude()
  mPassword: string;
} 