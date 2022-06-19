import { BadRequestException, ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { AuthRegisterDto } from '@/auth/dto';
import { PrismaService } from '@/prisma/prisma.service';
import argon2 from 'argon2';
import { User } from '@/user/user.entity';

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
