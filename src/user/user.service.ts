import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from '@/auth/dto';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@/user/user.entity';
import { UserUpdatePasswordDto } from '@/user/dto/user.update.password';

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

  async findByEmail(mEmail: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { mEmail }
    })
  }
}
