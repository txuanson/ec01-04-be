import { User as PrismaUser } from "@prisma/client";
import { Exclude } from "class-transformer";
export class User implements PrismaUser {
  mId: number;
  mName: string;
  mEmail: string;
  mCreatedAt: Date;
  mAvatar: string;
  mModifiedAt: Date;
  mLastLogin: Date;

  @Exclude()
  mPassword: string;
} 