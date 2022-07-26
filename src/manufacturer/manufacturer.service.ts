import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createManufacturerDto: CreateManufacturerDto) {
    return await this.prisma.manufacturer.create({
      data: {
        ...createManufacturerDto
      }
    })
  }

  async findAll() {
    return await this.prisma.manufacturer.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.manufacturer.findUnique({
      where: {
        mId: id
      }
    })
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return await this.prisma.manufacturer.update({
      where: {
        mId: id
      },
      data: {
        ...updateManufacturerDto
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.manufacturer.delete({
      where: {
        mId: id
      }
    })
  }
}
