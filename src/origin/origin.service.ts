import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';

@Injectable()
export class OriginService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createOriginDto: CreateOriginDto) {
    return await this.prisma.origin.create({
      data: {
        ...createOriginDto
      }
    })
  }

  async findAll() {
    return await this.prisma.origin.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.origin.findUnique({
      where: {
        mId: id
      }
    })
  }

  async update(id: number, updateOriginDto: UpdateOriginDto) {
    return await this.prisma.origin.update({
      where: {
        mId: id
      },
      data: {
        ...updateOriginDto
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.origin.delete({
      where: {
        mId: id
      }
    })
  }
}
