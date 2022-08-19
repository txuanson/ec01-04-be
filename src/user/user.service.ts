import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from '@/auth/dto';
import { PrismaService } from '@/prisma/prisma.service';
import { UserEntity } from '@/user/entities/user.entity';
import { UserUpdatePasswordDto } from '@/user/dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(dto: AuthRegisterDto, mName: string) {
    await this.prisma.user.create({
      data: { ...dto, mName }
    });
  }

  async updatePassword(dto: UserUpdatePasswordDto): Promise<void> {
    await this.prisma.user.update({
      where: {
        mId: dto.mUserId
      },
      data: {
        mPassword: dto.mPassword
      }
    })
  }

  async exists(mEmail: string): Promise<Boolean> {
    const userExists = await this.prisma.user.findUnique({
      where: { mEmail }
    })

    return userExists ? true : false;
  }

  async findByEmail(mEmail: string): Promise<UserEntity> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { mEmail },
    })
  }

  async findById(userId: number): Promise<Omit<UserEntity, 'mPassword' | 'mCreatedAt' | 'mModifiedAt'>> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        mId: userId
      },
      select: {
        mId: true,
        mAvatar: true,
        mEmail: true,
        mLastLogin: true,
        mName: true
      }
    })
  }
}
