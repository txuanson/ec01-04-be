import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(userId: number, CreateUserAddressDto: CreateUserAddressDto) {
    return this.prisma.userAddress.create({
      data: { ...CreateUserAddressDto, mUserId: userId }
    });
  }

  async update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    return this.prisma.userAddress.update({
      where: {
        mId: id
      },
      data: { ...updateUserAddressDto }
    });
  }

  async findById(id: number) {
    return this.prisma.userAddress.findUniqueOrThrow({
      where: {
        mId: id
      }
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.userAddress.findMany({
      where: {
        mUserId: userId
      }
    })
  }

  async delete(id: number) {
    return this.prisma.userAddress.delete({
      where: {
        mId: id
      }
    });
  }
}
